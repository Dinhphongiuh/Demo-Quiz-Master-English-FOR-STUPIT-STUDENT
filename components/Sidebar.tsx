import React from 'react';
import { Plus, GripVertical, CheckCircle2, MoreHorizontal, FileText, Upload } from 'lucide-react';
import { Question } from '../types';

interface SidebarProps {
  questions: Question[];
  activeQuestionId: string | null;
  onSelectQuestion: (id: string) => void;
  onAddQuestion: () => void;
  onDeleteQuestion: (id: string) => void;
  onImportImage: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  questions, 
  activeQuestionId, 
  onSelectQuestion, 
  onAddQuestion,
  onImportImage
}) => {
  return (
    <div className="w-72 bg-white h-full border-r border-slate-200 flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Questions ({questions.length})</h2>
        <div className="flex items-center gap-1">
          <button 
            onClick={onImportImage}
            className="p-1.5 hover:bg-slate-100 rounded-md transition-colors text-slate-600"
            aria-label="Import from Image"
            title="Generate Quiz from Image"
          >
            <Upload size={18} />
          </button>
          <button 
            onClick={onAddQuestion}
            className="p-1.5 hover:bg-slate-100 rounded-md transition-colors text-slate-600"
            aria-label="Add Question"
            title="Add New Question"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {questions.map((q, index) => (
          <div 
            key={q.id}
            onClick={() => onSelectQuestion(q.id)}
            className={`
              group relative flex flex-col p-3 rounded-xl border transition-all cursor-pointer select-none
              ${activeQuestionId === q.id 
                ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
            `}
          >
            <div className="flex items-start gap-3">
              <span className={`
                flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold mt-0.5
                ${activeQuestionId === q.id ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}
              `}>
                {index + 1}
              </span>
              
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${activeQuestionId === q.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                  {q.text || "New Question"}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                    {q.type}
                  </span>
                </div>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {questions.length === 0 && (
          <div className="text-center py-10 px-4 text-slate-400">
            <FileText size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No questions yet.</p>
            <button 
              onClick={onAddQuestion}
              className="mt-2 text-sm text-indigo-600 font-medium hover:underline"
            >
              Add your first question
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Total Points: {questions.reduce((acc, q) => acc + q.points, 0)}</span>
          <span>Time: {Math.ceil(questions.reduce((acc, q) => acc + q.timeLimit, 0) / 60)} mins</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;