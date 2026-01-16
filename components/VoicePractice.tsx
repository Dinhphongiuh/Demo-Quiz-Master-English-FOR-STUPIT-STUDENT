import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, X, Activity, Volume2, Loader2, Home } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

interface VoicePracticeProps {
  onExit: () => void;
}

const VoicePractice: React.FC<VoicePracticeProps> = ({ onExit }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [status, setStatus] = useState("Ready to start");
  const [volumeLevel, setVolumeLevel] = useState(0);

  // Audio Context Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Helper: Encode PCM for Gemini (Float32 -> Int16 -> Base64)
  const createPcmBlob = (data: Float32Array) => {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      // Clamp values
      const s = Math.max(-1, Math.min(1, data[i]));
      int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    
    // Convert to binary string manually to avoid stack overflow with spread operator on large arrays
    let binary = '';
    const bytes = new Uint8Array(int16.buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    
    return {
      data: btoa(binary),
      mimeType: 'audio/pcm;rate=16000',
    };
  };

  // Helper: Decode Base64 from Gemini to AudioBuffer
  const decodeAudioData = async (
    base64String: string,
    ctx: AudioContext
  ): Promise<AudioBuffer> => {
    const binaryString = atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    const dataInt16 = new Int16Array(bytes.buffer);
    const sampleRate = 24000;
    const numChannels = 1;
    const frameCount = dataInt16.length;
    
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    const channelData = buffer.getChannelData(0);
    
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }
    
    return buffer;
  };

  const startSession = async () => {
    try {
      setIsConnecting(true);
      setStatus("Initializing audio...");

      // 1. Setup Audio Contexts
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      inputAudioContextRef.current = new AudioContextClass({ sampleRate: 16000 });
      outputAudioContextRef.current = new AudioContextClass({ sampleRate: 24000 });

      // 2. Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // 3. Initialize Gemini Client
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      setStatus("Connecting to AI...");

      // 4. Connect to Live API
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: 'You are a friendly and encouraging English tutor. engage in a natural conversation with the user to help them practice their English speaking skills. Correct them gently if they make major mistakes, but prioritize flow.',
        },
        callbacks: {
          onopen: () => {
            console.log("Session opened");
            setIsConnected(true);
            setIsConnecting(false);
            setStatus("Listening...");
            
            // Setup Input Processing
            if (!inputAudioContextRef.current) return;
            
            const source = inputAudioContextRef.current.createMediaStreamSource(stream);
            const processor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              
              // Simple volume meter logic
              let sum = 0;
              for (let i = 0; i < inputData.length; i++) sum += inputData[i] * inputData[i];
              setVolumeLevel(Math.sqrt(sum / inputData.length));

              const pcmBlob = createPcmBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(processor);
            processor.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            const outputCtx = outputAudioContextRef.current;
            if (!outputCtx) return;

            // Handle Audio Output
            const base64Audio = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              try {
                // Ensure nextStartTime is at least current time
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
                
                const audioBuffer = await decodeAudioData(base64Audio, outputCtx);
                const source = outputCtx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputCtx.destination);
                
                source.addEventListener('ended', () => {
                  sourcesRef.current.delete(source);
                });

                source.start(nextStartTimeRef.current);
                sourcesRef.current.add(source);
                
                // Advance time cursor
                nextStartTimeRef.current += audioBuffer.duration;
              } catch (err) {
                console.error("Audio decode error", err);
              }
            }

            // Handle Interruption
            if (msg.serverContent?.interrupted) {
              console.log("Interrupted");
              sourcesRef.current.forEach(source => source.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
            console.log("Session closed");
            handleDisconnect();
          },
          onerror: (err) => {
            console.error("Session error", err);
            setStatus("Connection error");
            handleDisconnect();
          }
        }
      });
      
      sessionRef.current = sessionPromise;

    } catch (error) {
      console.error("Failed to start session:", error);
      setStatus("Error accessing microphone or API");
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    // 1. Close Session
    if (sessionRef.current) {
        sessionRef.current.then((session: any) => session.close());
        sessionRef.current = null;
    }

    // 2. Stop Tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // 3. Close Contexts
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }

    setIsConnected(false);
    setIsConnecting(false);
    setVolumeLevel(0);
    setStatus("Session ended");
    sourcesRef.current.clear();
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      handleDisconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-20 transition-all duration-300 ${isConnected ? 'scale-125 opacity-30' : 'scale-100'}`}></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[100px] opacity-10"></div>
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          <Activity className="text-indigo-400" />
          <span className="font-bold text-lg tracking-wide">AI Conversation Mode</span>
        </div>
        <button 
          onClick={onExit}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Interaction Area */}
      <div className="z-10 flex flex-col items-center gap-12 text-center max-w-lg px-4">
        
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            English Practice
          </h1>
          <p className="text-lg text-slate-400">
            {isConnected ? "Speak naturally. I'm listening." : "Start a real-time voice conversation to improve your fluency."}
          </p>
        </div>

        {/* Visualizer / Button */}
        <div className="relative">
          {/* Ripple Effects when speaking */}
          {isConnected && (
            <>
              <div 
                className="absolute inset-0 rounded-full border border-indigo-500 opacity-50 transition-all duration-75"
                style={{ transform: `scale(${1 + volumeLevel * 5})` }}
              ></div>
               <div 
                className="absolute inset-0 rounded-full border border-purple-500 opacity-30 transition-all duration-100"
                style={{ transform: `scale(${1 + volumeLevel * 8})` }}
              ></div>
            </>
          )}

          <button
            onClick={isConnected ? handleDisconnect : startSession}
            disabled={isConnecting}
            className={`
              w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative z-10
              ${isConnected 
                ? 'bg-red-500 hover:bg-red-600 shadow-red-900/50' 
                : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/50'}
              ${isConnecting ? 'cursor-not-allowed opacity-80' : ''}
            `}
          >
            {isConnecting ? (
              <Loader2 size={48} className="animate-spin text-white" />
            ) : isConnected ? (
              <MicOff size={48} className="text-white" />
            ) : (
              <Mic size={48} className="text-white" />
            )}
          </button>
        </div>

        {/* Status Indicator */}
        <div className="h-8">
           <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${isConnected ? 'bg-green-500/20 text-green-300' : 'bg-slate-800 text-slate-400'}`}>
              {isConnected && <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>}
              {status}
           </div>
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="absolute bottom-10 left-0 w-full text-center z-10 px-4">
        <p className="text-sm text-slate-500">
           Powered by Gemini 2.5 Flash Native Audio. <br/>Use headphones for the best experience.
        </p>
      </div>

    </div>
  );
};

export default VoicePractice;