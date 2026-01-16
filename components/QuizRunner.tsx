import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Check, Timer, X, LayoutGrid, AlertTriangle, LogOut, ZoomIn, Lightbulb, Send, CheckCircle2, Volume2, Play, Pause, Pencil } from 'lucide-react';
import { QuizSet, UserAnswer, Question, QuestionType } from '../types';

interface QuizRunnerProps {
  quizSet: QuizSet;
  onComplete: (answers: UserAnswer[], timeSpent: number) => void;
  onExit: () => void;
}

const SECTION_TITLES: Record<string, string> = {
  'vocab': 'Vocabulary & Grammar Questions',
  'sign': 'Signs & Notices',
  'read': 'Reading Passages',
  'cloze': 'Fill in the Blanks',
  'listen': 'Audio Questions',
  'lis': 'Listening Comprehension',
};

// Simple Audio Player Component
const AudioPlayer: React.FC<{ url: string }> = ({ url }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onEnd = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onEnd);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-indigo-50 rounded-xl p-4 mb-6 border border-indigo-100 flex items-center gap-4">
      <audio ref={audioRef} src={url} className="hidden" />
      <button 
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-colors shadow-md"
      >
        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
      </button>
      <div className="flex-1">
        <div className="h-2 bg-indigo-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-100" 
            style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-xs font-medium text-indigo-600">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <Volume2 className="text-indigo-400" size={20} />
    </div>
  );
};

const QuizRunner: React.FC<QuizRunnerProps> = ({ quizSet, onComplete, onExit }) => {
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [expandedExplanations, setExpandedExplanations] = useState<Set<string>>(new Set());
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Group questions by section based on ID prefix (e.g., 'vocab', 'read')
  const sections = useMemo(() => {
    const grouped: Record<string, Question[]> = {};
    const sectionOrder: string[] = [];

    quizSet.questions.forEach(q => {
      // Extract prefix (e.g., 'vocab' from 'vocab_basic_1')
      const prefix = q.id.includes('_') ? q.id.split('_')[0] : 'general';
      
      if (!grouped[prefix]) {
        grouped[prefix] = [];
        sectionOrder.push(prefix);
      }
      grouped[prefix].push(q);
    });

    return sectionOrder.map(prefix => ({
      id: prefix,
      title: SECTION_TITLES[prefix] || (prefix === 'general' ? 'Questions' : `${prefix.toUpperCase()} Section`),
      questions: grouped[prefix]
    }));
  }, [quizSet]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOptionSelect = (questionId: string, optionId: string) => {
    const existingAnswerIndex = answers.findIndex(a => a.questionId === questionId);
    const newAnswer: UserAnswer = { questionId, selectedOptionId: optionId };
    
    if (existingAnswerIndex > -1) {
      const newAnswers = [...answers];
      newAnswers[existingAnswerIndex] = newAnswer;
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, newAnswer]);
    }
  };

  const handleTextAnswer = (questionId: string, text: string) => {
    const existingAnswerIndex = answers.findIndex(a => a.questionId === questionId);
    const newAnswer: UserAnswer = { questionId, textAnswer: text };
    
    if (existingAnswerIndex > -1) {
      const newAnswers = [...answers];
      newAnswers[existingAnswerIndex] = newAnswer;
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, newAnswer]);
    }
  };

  const getSelectedOption = (questionId: string) => {
    return answers.find(a => a.questionId === questionId)?.selectedOptionId;
  };
  
  const getTextAnswer = (questionId: string) => {
    return answers.find(a => a.questionId === questionId)?.textAnswer || '';
  };

  const toggleExplanation = (questionId: string) => {
    const newSet = new Set(expandedExplanations);
    if (newSet.has(questionId)) {
      newSet.delete(questionId);
    } else {
      newSet.add(questionId);
    }
    setExpandedExplanations(newSet);
  };

  const scrollToQuestion = (questionId: string) => {
    const element = document.getElementById(`question-${questionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add a momentary highlight effect
      element.classList.add('ring-2', 'ring-indigo-400', 'ring-offset-2');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-indigo-400', 'ring-offset-2');
      }, 1500);
    }
    setIsSidebarOpen(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (answers.length / quizSet.questions.length) * 100;

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden relative">
      
      {/* Image Zoom Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-full max-h-full flex flex-col items-center">
            <button 
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 md:-right-12 text-white hover:text-slate-300 transition-colors p-2"
            >
              <X size={32} />
            </button>
            <img 
              src={previewImage} 
              alt="Full Size" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}

      {/* Exit Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-[scale_0.2s_ease-out]">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Quit {quizSet.title}?</h3>
              <p className="text-slate-500 mb-6">
                Are you sure you want to quit? Your current progress will be lost.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowExitModal(false)}
                  className="flex-1 py-2.5 px-4 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Continue
                </button>
                <button 
                  onClick={onExit}
                  className="flex-1 py-2.5 px-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-colors"
                >
                  Quit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 h-16 flex-shrink-0 z-30 relative shadow-sm">
        <div className="h-full flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowExitModal(true)} 
              className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
              title="Exit Exam"
            >
              <LogOut size={20} className="rotate-180" />
            </button>
            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
            <div>
              <h2 className="font-bold text-slate-800 text-sm md:text-base truncate max-w-[150px] md:max-w-md">
                {quizSet.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
             <div className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-mono font-medium flex items-center gap-2 shadow-sm border border-indigo-100">
               <Timer size={16} />
               {formatTime(timeElapsed)}
             </div>
             
             <button 
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               className={`md:hidden p-2 rounded-lg transition-colors ${isSidebarOpen ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-slate-100 text-slate-500'}`}
             >
               <LayoutGrid size={20} />
             </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-100">
           <div 
             className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out rounded-r"
             style={{ width: `${progress}%` }}
           ></div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Scrollable Question List */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 scroll-smooth bg-slate-50">
           <div className="max-w-3xl mx-auto pb-24 space-y-12">
              
              {sections.map((section) => (
                <div key={section.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-4 mb-6 sticky top-0 bg-slate-50/95 backdrop-blur-sm py-4 z-10 border-b border-slate-200/50">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                      {section.title}
                    </h2>
                    <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full">
                      {section.questions.length} Questions
                    </span>
                  </div>

                  <div className="space-y-8">
                    {section.questions.map((q, idx) => (
                      <div 
                        id={`question-${q.id}`} 
                        key={q.id} 
                        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 transition-all hover:shadow-md"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <span className="inline-flex items-center justify-center h-8 px-3 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm">
                            Question {quizSet.questions.findIndex(question => question.id === q.id) + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded">
                            {q.points} Points
                          </span>
                        </div>

                        {/* Audio Player for Listening */}
                        {q.audioUrl && (
                          <AudioPlayer url={q.audioUrl} />
                        )}

                        {/* Image */}
                        {q.image && (
                          <div className="mb-6 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 flex justify-center relative group">
                            <img 
                              src={q.image} 
                              alt="Question Illustration" 
                              className="max-h-72 w-auto object-contain cursor-zoom-in transition-transform hover:scale-[1.02]"
                              onClick={() => setPreviewImage(q.image || null)}
                            />
                            <button 
                              onClick={() => setPreviewImage(q.image || null)}
                              className="absolute bottom-3 right-3 bg-white/90 p-2 rounded-lg shadow-sm text-slate-600 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ZoomIn size={18} />
                            </button>
                          </div>
                        )}

                        <h3 className="text-lg md:text-xl font-medium text-slate-800 mb-6 leading-relaxed">
                          {q.text}
                        </h3>

                        {/* Question Interaction Area */}
                        {q.type === QuestionType.SHORT_ANSWER ? (
                           // Short Answer Input
                           <div className="relative">
                             <div className="absolute top-3.5 left-4 text-slate-400 pointer-events-none">
                               <Pencil size={18} />
                             </div>
                             <input
                               type="text"
                               value={getTextAnswer(q.id)}
                               onChange={(e) => handleTextAnswer(q.id, e.target.value)}
                               placeholder="Type your answer here..."
                               className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:ring-0 outline-none text-slate-800 placeholder-slate-400 transition-all font-medium"
                             />
                           </div>
                        ) : (
                           // Multiple Choice / Single Choice / True False
                           <div className={`grid gap-3 ${q.type === QuestionType.TRUE_FALSE ? 'grid-cols-2' : 'grid-cols-1'}`}>
                             {q.options.map((option, optIdx) => {
                               const isSelected = getSelectedOption(q.id) === option.id;
                               const letter = String.fromCharCode(65 + optIdx);
                               
                               return (
                                 <button
                                   key={option.id}
                                   onClick={() => handleOptionSelect(q.id, option.id)}
                                   className={`
                                     w-full flex items-center p-3 md:p-4 rounded-xl border-2 text-left transition-all group relative overflow-hidden
                                     ${isSelected 
                                       ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 shadow-sm' 
                                       : 'border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'}
                                   `}
                                 >
                                   {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600"></div>}

                                   {q.type !== QuestionType.TRUE_FALSE && (
                                      <div className={`
                                        w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm mr-4 flex-shrink-0 transition-colors
                                        ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}
                                      `}>
                                        {letter}
                                      </div>
                                   )}
                                   
                                   <span className={`text-sm md:text-base flex-1 ${q.type === QuestionType.TRUE_FALSE ? 'text-center font-bold' : ''}`}>
                                     {option.text}
                                   </span>
                                   
                                   {isSelected && q.type !== QuestionType.TRUE_FALSE && (
                                     <CheckCircle2 size={20} className="ml-auto text-indigo-600" />
                                   )}
                                 </button>
                               );
                             })}
                           </div>
                        )}

                        {/* Hint/Explanation Toggle */}
                        {q.explanation && (
                          <div className="mt-4 pt-4 border-t border-slate-50">
                            <button 
                              onClick={() => toggleExplanation(q.id)}
                              className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 font-medium transition-colors"
                            >
                              <Lightbulb size={16} className={expandedExplanations.has(q.id) ? "text-amber-500 fill-amber-500" : ""} />
                              {expandedExplanations.has(q.id) ? "Hide Hint" : "Show Hint"}
                            </button>
                            
                            {expandedExplanations.has(q.id) && (
                              <div className="mt-3 p-4 bg-amber-50 border border-amber-100 rounded-lg text-amber-900 text-sm animate-in fade-in slide-in-from-top-1">
                                {q.explanation}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Submit Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center mt-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Finish {quizSet.title}?</h3>
                <p className="text-slate-500 mb-6">
                  You have answered {answers.length} out of {quizSet.questions.length} questions.
                </p>
                <button 
                  onClick={() => onComplete(answers, timeElapsed)}
                  className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-xl shadow-indigo-200 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mx-auto"
                >
                  <Send size={20} />
                  Submit Part
                </button>
              </div>

           </div>
        </main>

        {/* Sidebar Navigation */}
        <aside className={`
          absolute inset-y-0 right-0 z-40 w-80 bg-white border-l border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl md:shadow-none
          md:relative md:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:hidden'}
        `}>
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 backdrop-blur">
             <div>
               <h3 className="font-bold text-slate-800">Exam Navigator</h3>
               <p className="text-xs text-slate-500 mt-0.5">{answers.length} / {quizSet.questions.length} answered</p>
             </div>
             <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-1 text-slate-400 hover:text-slate-600">
               <X size={20} />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
            {sections.map(section => (
              <div key={section.id} className="mb-6">
                <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white/95 backdrop-blur z-10">
                  {section.title}
                </div>
                <div className="grid grid-cols-5 gap-2 px-3">
                  {section.questions.map((q) => {
                    const idx = quizSet.questions.findIndex(ques => ques.id === q.id);
                    const isAnswered = answers.some(a => a.questionId === q.id && (a.selectedOptionId || a.textAnswer));
                    
                    return (
                      <button
                        key={q.id}
                        onClick={() => scrollToQuestion(q.id)}
                        className={`
                          aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all
                          ${isAnswered 
                            ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700' 
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'}
                        `}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-slate-100 bg-slate-50">
             <div className="flex gap-4 text-xs text-slate-500 justify-center">
                <div className="flex items-center gap-1.5">
                   <div className="w-3 h-3 rounded bg-indigo-600"></div>
                   <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                   <div className="w-3 h-3 rounded bg-slate-200"></div>
                   <span>Pending</span>
                </div>
             </div>
          </div>
        </aside>

        {isSidebarOpen && (
          <div 
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px] z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

      </div>
    </div>
  );
};

export default QuizRunner;