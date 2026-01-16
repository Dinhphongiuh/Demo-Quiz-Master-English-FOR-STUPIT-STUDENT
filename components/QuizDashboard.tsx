import React from 'react';
import { Play, BookOpen, Shuffle, Clock, BarChart3, GraduationCap, Mic, PenTool, Type, Eye, Headphones, FileText, Languages, Star } from 'lucide-react';
import { QuizSet } from '../types';

interface QuizDashboardProps {
  quizSets: QuizSet[];
  onSelectSet: (set: QuizSet) => void;
  onRandomQuiz: () => void;
  onVoicePractice: () => void;
  onOpenEditor?: () => void;
  onSelectPart: (setId: string) => void;
}

const QuizDashboard: React.FC<QuizDashboardProps> = ({ 
  quizSets, 
  onSelectSet, 
  onRandomQuiz, 
  onVoicePractice, 
  onOpenEditor,
  onSelectPart
}) => {
  
  // Helper to get icon based on set ID
  const getIconForSet = (id: string) => {
    if (id.includes('full-b1')) return <Star size={24} className="text-yellow-600" />;
    if (id.includes('vocab')) return <Type size={24} className="text-blue-600" />;
    if (id.includes('sign')) return <Eye size={24} className="text-amber-600" />;
    if (id.includes('read')) return <BookOpen size={24} className="text-green-600" />;
    if (id.includes('cloze')) return <FileText size={24} className="text-purple-600" />;
    if (id.includes('listen')) return <Headphones size={24} className="text-red-600" />;
    return <GraduationCap size={24} className="text-slate-600" />;
  };

  const getColorForSet = (id: string) => {
    if (id.includes('full-b1')) return 'bg-yellow-100';
    if (id.includes('vocab')) return 'bg-blue-100';
    if (id.includes('sign')) return 'bg-amber-100';
    if (id.includes('read')) return 'bg-green-100';
    if (id.includes('cloze')) return 'bg-purple-100';
    if (id.includes('listen')) return 'bg-red-100';
    return 'bg-slate-100';
  };

  // Extract the Mock Test and others
  const mockTest = quizSets.find(s => s.id === 'full-b1-mock');
  const otherSets = quizSets.filter(s => s.id !== 'full-b1-mock');

  const handleSetClick = (set: QuizSet) => {
    if (set.id === 'part1-vocabulary') {
      onSelectPart(set.id);
    } else {
      onSelectSet(set);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white shadow-xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">English Skills Assessment</h1>
          <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mb-8">
            Select a specific skill to practice. Each module is graded separately to help you focus on your improvements.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onRandomQuiz}
              className="group flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Shuffle className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
              Quick Random Test
            </button>
            
            <button 
              onClick={onVoicePractice}
              className="group flex items-center gap-3 bg-indigo-500/30 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Mic className="w-6 h-6 animate-pulse" />
              Voice Practice
            </button>

            {onOpenEditor && (
              <button 
                onClick={onOpenEditor}
                className="group flex items-center gap-3 bg-transparent border border-white/40 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all shadow-lg transform hover:-translate-y-1"
              >
                <PenTool className="w-6 h-6" />
                Editor
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Featured Mock Test Card */}
      {mockTest && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-yellow-500 rounded-full inline-block"></span>
            Recommended
          </h2>
          <div 
            onClick={() => onSelectSet(mockTest)}
            className="group bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200 p-8 hover:shadow-xl hover:border-yellow-300 transition-all cursor-pointer relative flex flex-col md:flex-row items-center gap-8"
          >
            <div className="p-6 bg-white rounded-2xl shadow-sm text-yellow-600">
              <Star size={48} fill="currentColor" className="text-yellow-400" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                Full Simulation
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-3 group-hover:text-yellow-700 transition-colors">
                {mockTest.title}
              </h3>
              <p className="text-slate-600 text-lg mb-4 max-w-2xl">
                {mockTest.description}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium text-slate-500">
                <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-yellow-100">
                  <Clock size={16} className="text-yellow-500" /> {mockTest.estimatedTime} mins
                </span>
                <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-yellow-100">
                  <BarChart3 size={16} className="text-yellow-500" /> {mockTest.questions.length} Questions
                </span>
              </div>
            </div>
            <button className="px-8 py-4 bg-yellow-500 text-white font-bold rounded-xl shadow-lg shadow-yellow-200 group-hover:bg-yellow-600 group-hover:-translate-y-1 transition-all flex items-center gap-2">
              Start Exam <Play size={20} fill="currentColor" />
            </button>
          </div>
        </div>
      )}

      {/* Other Quiz Sets Grid */}
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="w-1 h-8 bg-indigo-600 rounded-full inline-block"></span>
        Practice Modules
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherSets.map((set) => (
          <div 
            key={set.id}
            onClick={() => handleSetClick(set)}
            className="group bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-300 transition-all cursor-pointer relative top-0 hover:-top-1 flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${getColorForSet(set.id)}`}>
                 {getIconForSet(set.id)}
              </div>
              <div className="text-slate-400 flex items-center gap-1 text-sm bg-slate-50 px-2 py-1 rounded-lg">
                <Clock size={14} />
                {set.id === 'part1-vocabulary' ? '15' : set.estimatedTime} min
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
              {set.title}
            </h3>
            <p className="text-slate-500 text-sm mb-6 flex-1">
              {set.description}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              <span className="text-sm font-medium text-slate-600">
                {set.id === 'part1-vocabulary' ? '160 Questions (4 Parts)' : `${set.questions.length} Questions`}
              </span>
              <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Play size={20} className="ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizDashboard;