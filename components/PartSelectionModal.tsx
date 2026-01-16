import React from 'react';
import { X, Shuffle, ListOrdered } from 'lucide-react';

interface PartSelectionModalProps {
  onSelect: (part: 'part1' | 'part2' | 'part3' | 'part4' | 'random') => void;
  onClose: () => void;
  title: string;
}

const PartSelectionModal: React.FC<PartSelectionModalProps> = ({ onSelect, onClose, title }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-[scale_0.2s_ease-out] relative">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-slate-600 mb-6">
            This section is divided into 4 parts. Choose a specific part to practice or take a random selection.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button 
              onClick={() => onSelect('part1')}
              className="flex flex-col items-center justify-center p-4 bg-indigo-50 border border-indigo-100 rounded-xl hover:bg-indigo-100 hover:border-indigo-200 transition-all group"
            >
              <span className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-indigo-600 font-bold mb-2 shadow-sm group-hover:scale-110 transition-transform">1</span>
              <span className="font-semibold text-indigo-900">Questions 1-50</span>
            </button>
            
            <button 
              onClick={() => onSelect('part2')}
              className="flex flex-col items-center justify-center p-4 bg-indigo-50 border border-indigo-100 rounded-xl hover:bg-indigo-100 hover:border-indigo-200 transition-all group"
            >
              <span className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-indigo-600 font-bold mb-2 shadow-sm group-hover:scale-110 transition-transform">2</span>
              <span className="font-semibold text-indigo-900">Questions 51-100</span>
            </button>
            
            <button 
              onClick={() => onSelect('part3')}
              className="flex flex-col items-center justify-center p-4 bg-indigo-50 border border-indigo-100 rounded-xl hover:bg-indigo-100 hover:border-indigo-200 transition-all group"
            >
              <span className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-indigo-600 font-bold mb-2 shadow-sm group-hover:scale-110 transition-transform">3</span>
              <span className="font-semibold text-indigo-900">Questions 101-150</span>
            </button>
            
            <button 
              onClick={() => onSelect('part4')}
              className="flex flex-col items-center justify-center p-4 bg-indigo-50 border border-indigo-100 rounded-xl hover:bg-indigo-100 hover:border-indigo-200 transition-all group"
            >
              <span className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-indigo-600 font-bold mb-2 shadow-sm group-hover:scale-110 transition-transform">4</span>
              <span className="font-semibold text-indigo-900">Questions 151-200</span>
            </button>
          </div>
          
          <button 
            onClick={() => onSelect('random')}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
          >
            <Shuffle size={20} />
            Random Selection (50 Questions)
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartSelectionModal;