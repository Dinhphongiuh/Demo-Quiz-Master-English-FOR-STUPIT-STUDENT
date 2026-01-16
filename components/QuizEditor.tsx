import React, { useState, useRef } from 'react';
import Sidebar from './Sidebar';
import QuestionEditor from './QuestionEditor';
import { generateQuestionWithAI, extractQuestionsFromImage } from '../services/geminiService';
import { Question, QuestionType } from '../types';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface QuizEditorProps {
   onExit: () => void;
}

const QuizEditor: React.FC<QuizEditorProps> = ({ onExit }) => {
   const [questions, setQuestions] = useState<Question[]>([]);
   const [activeId, setActiveId] = useState<string | null>(null);
   const [isGenerating, setIsGenerating] = useState(false);
   const [isImporting, setIsImporting] = useState(false);
   
   const importFileRef = useRef<HTMLInputElement>(null);
   
   const activeQuestion = questions.find(q => q.id === activeId);
   
   const handleAddQuestion = () => {
     const newQ: Question = {
       id: crypto.randomUUID(),
       type: QuestionType.SINGLE_CHOICE,
       text: '',
       options: [
         { id: crypto.randomUUID(), text: '', isCorrect: false },
         { id: crypto.randomUUID(), text: '', isCorrect: false },
       ],
       points: 1,
       timeLimit: 30,
       required: true
     };
     setQuestions([...questions, newQ]);
     setActiveId(newQ.id);
   };
   
   const handleUpdateQuestion = (q: Question) => {
      setQuestions(questions.map(item => item.id === q.id ? q : item));
   };
   
   const handleDeleteQuestion = (id: string) => {
      const newQuestions = questions.filter(q => q.id !== id);
      setQuestions(newQuestions);
      if (activeId === id) setActiveId(null);
   };
   
   const handleGenerateAI = async (topic: string, difficulty: string) => {
      if (!activeId) return;
      setIsGenerating(true);
      try {
        const result = await generateQuestionWithAI(topic, difficulty);
        const updatedQ: Question = {
           ...activeQuestion!,
           text: result.questionText,
           explanation: result.explanation,
           options: result.options.map(o => ({
              id: crypto.randomUUID(),
              text: o.text,
              isCorrect: o.isCorrect
           }))
        };
        handleUpdateQuestion(updatedQ);
      } catch (e) {
        alert("Failed to generate question. Please try again.");
        console.error(e);
      } finally {
        setIsGenerating(false);
      }
   };

   const handleImportClick = () => {
      importFileRef.current?.click();
   };

   const handleImportFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      setIsImporting(true);
      try {
         const reader = new FileReader();
         reader.onloadend = async () => {
            const base64 = reader.result as string;
            const extractedQuestions = await extractQuestionsFromImage(base64);
            
            const newQuestions = extractedQuestions.map(eq => ({
               id: crypto.randomUUID(),
               type: QuestionType.SINGLE_CHOICE,
               text: eq.questionText,
               explanation: eq.explanation,
               options: eq.options.map(o => ({
                  id: crypto.randomUUID(),
                  text: o.text,
                  isCorrect: o.isCorrect
               })),
               points: 1,
               timeLimit: 45,
               required: true,
               // Use the imported image for the first question, or let user decide? 
               // For now, let's not attach the full page image to every question to avoid bloating.
            }));
            
            setQuestions(prev => [...prev, ...newQuestions]);
            if (newQuestions.length > 0 && !activeId) {
               setActiveId(newQuestions[0].id);
            }
         };
         reader.readAsDataURL(file);
      } catch (e) {
         console.error(e);
         alert("Failed to extract questions from the image.");
      } finally {
         setIsImporting(false);
         if (importFileRef.current) importFileRef.current.value = '';
      }
   };
   
   return (
     <div className="flex h-screen bg-slate-50 overflow-hidden">
       {/* Hidden Import Input */}
       <input 
          type="file" 
          ref={importFileRef}
          onChange={handleImportFileChange}
          className="hidden"
          accept="image/*"
       />

       {/* Loading Overlay for Import */}
       {isImporting && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center flex-col text-white">
             <Loader2 size={48} className="animate-spin mb-4" />
             <h3 className="text-xl font-bold">Analyzing Image...</h3>
             <p className="text-slate-300">Using Gemini Thinking Mode to extract questions</p>
          </div>
       )}

       <div className="flex flex-col border-r border-slate-200 bg-white h-full">
          <div className="p-4 border-b border-slate-100 flex-shrink-0">
            <button onClick={onExit} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium">
               <ArrowLeft size={20} /> Back to Dashboard
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
             <Sidebar 
               questions={questions}
               activeQuestionId={activeId}
               onSelectQuestion={setActiveId}
               onAddQuestion={handleAddQuestion}
               onDeleteQuestion={handleDeleteQuestion}
               onImportImage={handleImportClick}
             />
          </div>
       </div>
       <div className="flex-1 flex flex-col h-full overflow-hidden">
         {activeQuestion ? (
           <QuestionEditor 
             question={activeQuestion}
             onUpdate={handleUpdateQuestion}
             onDelete={handleDeleteQuestion}
             onGenerateAI={handleGenerateAI}
             isGenerating={isGenerating}
           />
         ) : (
           <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-300">
                  <ArrowLeft size={32} />
              </div>
              <p className="font-medium text-lg">Select a question to edit</p>
              <p className="text-sm opacity-70">Or create a new one from the sidebar</p>
           </div>
         )}
       </div>
     </div>
   );
}

export default QuizEditor;