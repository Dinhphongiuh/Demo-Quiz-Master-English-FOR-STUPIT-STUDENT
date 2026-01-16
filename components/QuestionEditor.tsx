import React, { useState, useRef, useEffect } from 'react';
import { 
  Trash2, Image as ImageIcon, GripVertical, Plus, 
  MoreHorizontal, Clock, Award, CheckCircle2, Circle, Copy, X,
  Sparkles, ToggleLeft, ToggleRight, Loader2, Type, ImagePlus
} from 'lucide-react';
import { Question, QuestionType, Option } from '../types';
import { generateImageForQuestion } from '../services/geminiService';

interface QuestionEditorProps {
  question: Question;
  onUpdate: (updatedQuestion: Question) => void;
  onDelete: (id: string) => void;
  onGenerateAI: (topic: string, difficulty: string) => void;
  isGenerating: boolean;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ 
  question, 
  onUpdate, 
  onDelete,
  onGenerateAI,
  isGenerating
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [aiMode, setAiMode] = useState(false);
  
  // AI Tab State
  const [aiTab, setAiTab] = useState<'TEXT' | 'IMAGE'>('TEXT');

  // Text Gen State
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  
  // Image Gen State
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  useEffect(() => {
    if (question.text && !imagePrompt) {
      setImagePrompt(question.text);
    }
  }, [question.text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ ...question, text: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate({ ...question, type: e.target.value as QuestionType });
  };

  const updateOption = (optionId: string, updates: Partial<Option>) => {
    const newOptions = question.options.map(opt => 
      opt.id === optionId ? { ...opt, ...updates } : opt
    );
    // If setting correct answer for Single Choice, uncheck others
    if (updates.isCorrect && (question.type === QuestionType.SINGLE_CHOICE || question.type === QuestionType.TRUE_FALSE)) {
       newOptions.forEach(opt => {
         if (opt.id !== optionId) opt.isCorrect = false;
       });
    }
    onUpdate({ ...question, options: newOptions });
  };

  const addOption = () => {
    const newOption: Option = {
      id: crypto.randomUUID(),
      text: '',
      isCorrect: false
    };
    onUpdate({ ...question, options: [...question.options, newOption] });
  };

  const deleteOption = (id: string) => {
    onUpdate({ ...question, options: question.options.filter(o => o.id !== id) });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ ...question, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    setIsGeneratingImage(true);
    try {
      const base64Image = await generateImageForQuestion(imagePrompt, imageSize);
      onUpdate({ ...question, image: base64Image });
    } catch (e) {
      console.error(e);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    onUpdate({ ...question, image: undefined });
    // Reset file input so selecting the same file triggers onChange again if needed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-50 p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        
        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          className="hidden" 
          accept="image/*"
        />

        {/* Top Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <select 
              value={question.type}
              onChange={handleTypeChange}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {Object.values(QuestionType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <div className="h-6 w-px bg-slate-200"></div>
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
              <div className={`w-10 h-6 rounded-full p-1 transition-colors ${question.required ? 'bg-indigo-600' : 'bg-slate-200'}`} onClick={() => onUpdate({...question, required: !question.required})}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${question.required ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
              Required
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button 
               onClick={() => setAiMode(!aiMode)}
               className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${aiMode ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
               title="Toggle AI Assistant"
            >
               <Sparkles size={16} />
               <span className="hidden sm:inline">AI Assistant</span>
               {aiMode ? <ToggleRight size={20} className="text-indigo-600"/> : <ToggleLeft size={20} />}
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <button 
              onClick={() => onDelete(question.id)}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* AI Generation Panel */}
        {aiMode && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 animate-in slide-in-from-top-2 fade-in shadow-inner overflow-hidden">
            <div className="flex border-b border-indigo-100/50 bg-indigo-50/50">
              <button 
                onClick={() => setAiTab('TEXT')}
                className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${aiTab === 'TEXT' ? 'bg-white text-indigo-700 border-t-2 border-indigo-500' : 'text-slate-500 hover:text-indigo-600'}`}
              >
                <Type size={16} /> Generate Question
              </button>
              <button 
                onClick={() => setAiTab('IMAGE')}
                className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${aiTab === 'IMAGE' ? 'bg-white text-indigo-700 border-t-2 border-indigo-500' : 'text-slate-500 hover:text-indigo-600'}`}
              >
                <ImagePlus size={16} /> Generate Image
              </button>
            </div>
            
            <div className="p-5">
              {aiTab === 'TEXT' ? (
                // Text Generation UI
                <div className="flex flex-col md:flex-row items-end gap-4">
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-bold text-indigo-900 uppercase mb-1.5">Topic / Context</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., Past Perfect Tense, Business Vocabulary..."
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm shadow-sm"
                      />
                      <Sparkles className="absolute left-3 top-2.5 text-indigo-400" size={16} />
                    </div>
                  </div>
                  <div className="w-full md:w-48">
                    <label className="block text-xs font-bold text-indigo-900 uppercase mb-1.5">Difficulty</label>
                    <select 
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full py-2.5 rounded-lg border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm shadow-sm"
                    >
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>
                  <button 
                    onClick={() => onGenerateAI(topic, difficulty)}
                    disabled={isGenerating || !topic.trim()}
                    className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow-md"
                  >
                    {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                    Generate
                  </button>
                </div>
              ) : (
                // Image Generation UI
                <div className="flex flex-col md:flex-row items-end gap-4">
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-bold text-indigo-900 uppercase mb-1.5">Image Prompt</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        placeholder="Describe the image you want..."
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm shadow-sm"
                      />
                      <ImagePlus className="absolute left-3 top-2.5 text-indigo-400" size={16} />
                    </div>
                  </div>
                  <div className="w-full md:w-32">
                    <label className="block text-xs font-bold text-indigo-900 uppercase mb-1.5">Size</label>
                    <select 
                      value={imageSize}
                      onChange={(e) => setImageSize(e.target.value as any)}
                      className="w-full py-2.5 rounded-lg border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm shadow-sm"
                    >
                      <option value="1K">1K (Std)</option>
                      <option value="2K">2K (HD)</option>
                      <option value="4K">4K (UHD)</option>
                    </select>
                  </div>
                  <button 
                    onClick={handleGenerateImage}
                    disabled={isGeneratingImage || !imagePrompt.trim()}
                    className="w-full md:w-auto px-6 py-2.5 bg-purple-600 text-white text-sm font-bold rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow-md"
                  >
                    {isGeneratingImage ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                    Create
                  </button>
                </div>
              )}
              
              <p className="text-xs text-indigo-400 mt-2 ml-1">
                {aiTab === 'TEXT' 
                  ? '* This will overwrite the current question text and options. (Thinking Mode Enabled)'
                  : '* Generates a square (1:1) image using gemini-3-pro-image-preview.'}
              </p>
            </div>
          </div>
        )}

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Question Body */}
          <div className="p-6 md:p-8">
            
            {/* Image Display Above Text */}
            {question.image && (
              <div className="mb-6 relative inline-block group/image">
                <img 
                  src={question.image} 
                  alt="Question" 
                  className="max-h-64 max-w-full rounded-xl border border-slate-100 object-contain bg-slate-50" 
                />
                <button 
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 p-1.5 bg-white text-red-500 rounded-full shadow-md border border-slate-100 hover:bg-red-50 transition-colors opacity-0 group-hover/image:opacity-100"
                  title="Remove Image"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <div className="flex gap-6">
              <div className="flex-1 space-y-4">
                <div className="relative group">
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Question Text</label>
                  <textarea
                    value={question.text}
                    onChange={handleTextChange}
                    placeholder="Enter your question here..."
                    className="w-full text-lg md:text-xl font-medium text-slate-800 placeholder-slate-300 border-none resize-none focus:ring-0 p-0 bg-transparent min-h-[80px]"
                    rows={3}
                  />
                  <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                     <button 
                        onClick={triggerFileInput}
                        className="p-1.5 bg-white border border-slate-200 rounded shadow-sm hover:text-indigo-600 text-slate-400 transition-colors"
                        title="Add/Change Image"
                     >
                        <ImageIcon size={16} />
                     </button>
                  </div>
                </div>
              </div>
              
              {/* Media Placeholder (Only show if no image) */}
              {!question.image && (
                <div 
                   onClick={triggerFileInput}
                   className="hidden md:flex flex-col items-center justify-center w-48 h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer group"
                >
                   <ImageIcon className="text-slate-300 group-hover:text-indigo-400 mb-2" size={32} />
                   <span className="text-xs text-slate-400 font-medium group-hover:text-indigo-500">Add Image</span>
                </div>
              )}
            </div>

            {/* Options Area */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-400 uppercase">Answer Choices</label>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500">Randomize Order</span>
                  <input type="checkbox" className="accent-indigo-600" />
                </div>
              </div>

              {question.options.map((option, idx) => (
                <div key={option.id} className="group flex items-center gap-3 p-2 rounded-lg border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all">
                  <button className="cursor-grab text-slate-300 hover:text-slate-500 opacity-0 group-hover:opacity-100">
                    <GripVertical size={16} />
                  </button>
                  
                  <button 
                    onClick={() => updateOption(option.id, { isCorrect: !option.isCorrect })}
                    className={`flex-shrink-0 transition-colors ${option.isCorrect ? 'text-green-500' : 'text-slate-300 hover:text-slate-400'}`}
                  >
                    {question.type === QuestionType.MULTIPLE_CHOICE ? (
                      option.isCorrect ? <CheckCircle2 size={24} /> : <Circle size={24} />
                    ) : (
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${option.isCorrect ? 'border-green-500' : 'border-slate-300'}`}>
                        {option.isCorrect && <div className="w-2.5 h-2.5 rounded-full bg-green-500" />}
                      </div>
                    )}
                  </button>

                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => updateOption(option.id, { text: e.target.value })}
                    placeholder={`Option ${idx + 1}`}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-slate-700 placeholder-slate-400"
                  />

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded">
                      <ImageIcon size={16} />
                    </button>
                    <button 
                      onClick={() => deleteOption(option.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              <button 
                onClick={addOption}
                className="mt-2 flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200 border-dashed w-full justify-center"
              >
                <Plus size={16} />
                Add Answer Choice
              </button>
            </div>
          </div>

          {/* Settings Footer */}
          <div className="bg-slate-50 border-t border-slate-200 p-4 flex flex-wrap items-center gap-6">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500">
                  <Clock size={18} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Duration</label>
                  <div className="flex items-center gap-1">
                    <input 
                      type="number" 
                      value={question.timeLimit} 
                      onChange={(e) => onUpdate({...question, timeLimit: parseInt(e.target.value) || 0})}
                      className="w-12 bg-transparent border-none p-0 text-sm font-semibold text-slate-700 focus:ring-0" 
                    />
                    <span className="text-xs text-slate-500">Seconds</span>
                  </div>
                </div>
             </div>

             <div className="w-px h-8 bg-slate-200"></div>

             <div className="flex items-center gap-3">
                <div className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500">
                  <Award size={18} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Points</label>
                  <div className="flex items-center gap-1">
                    <input 
                      type="number" 
                      value={question.points}
                      onChange={(e) => onUpdate({...question, points: parseInt(e.target.value) || 0})}
                      className="w-12 bg-transparent border-none p-0 text-sm font-semibold text-slate-700 focus:ring-0" 
                    />
                    <span className="text-xs text-slate-500">Pts</span>
                  </div>
                </div>
             </div>
             
             <div className="flex-1"></div>
             
             {question.explanation && (
                <div className="text-sm text-slate-500 italic max-w-xs truncate">
                  <span className="font-semibold text-indigo-600 not-italic mr-1">Hint:</span> 
                  {question.explanation}
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;