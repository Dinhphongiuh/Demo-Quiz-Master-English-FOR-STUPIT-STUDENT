import React from 'react';
import { CheckCircle2, XCircle, Clock, RotateCcw, Home, ImageIcon } from 'lucide-react';
import { QuizSet, UserAnswer, QuestionType } from '../types';

interface QuizResultProps {
  quizSet: QuizSet;
  answers: UserAnswer[];
  timeSpent: number;
  onRetry: () => void;
  onHome: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ quizSet, answers, timeSpent, onRetry, onHome }) => {
  const totalQuestions = quizSet.questions.length;
  
  const checkAnswer = (q: any, userAnswer: UserAnswer | undefined) => {
    if (!userAnswer) return false;
    
    if (q.type === QuestionType.SHORT_ANSWER) {
      const correctOption = q.options.find((o: any) => o.isCorrect);
      if (!correctOption) return false;
      const userText = (userAnswer.textAnswer || '').trim().toLowerCase();
      const correctText = correctOption.text.trim().toLowerCase();
      return userText === correctText;
    } else {
      const correctOption = q.options.find((o: any) => o.isCorrect);
      return userAnswer.selectedOptionId === correctOption?.id;
    }
  };

  const correctCount = quizSet.questions.reduce((acc, q) => {
    const userAnswer = answers.find(a => a.questionId === q.id);
    return checkAnswer(q, userAnswer) ? acc + 1 : acc;
  }, 0);

  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
  
  const getFeedbackMessage = () => {
    if (scorePercentage >= 90) return "Outstanding! You're a master!";
    if (scorePercentage >= 70) return "Great job! Keep it up!";
    if (scorePercentage >= 50) return "Good effort, but room for improvement.";
    return "Keep practicing, you'll get there!";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Score Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden text-center p-10 relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          
          <h2 className="text-slate-500 uppercase tracking-widest text-sm font-semibold mb-2">Quiz Completed</h2>
          <h1 className="text-3xl font-bold text-slate-800 mb-8">{quizSet.title}</h1>

          <div className="flex flex-col items-center justify-center mb-8">
             <div className="w-40 h-40 rounded-full border-8 border-indigo-100 flex items-center justify-center relative">
               <div className="absolute inset-0 rounded-full border-8 border-indigo-600 border-t-transparent animate-[spin_1s_ease-out_reverse]" style={{ transform: `rotate(${scorePercentage * 3.6}deg)` }}></div> 
               <div className="text-center">
                 <span className="block text-4xl font-extrabold text-indigo-600">{scorePercentage}%</span>
               </div>
             </div>
          </div>

          <p className="text-xl font-medium text-slate-700 mb-6">
            {getFeedbackMessage()}
          </p>

          <div className="flex justify-center gap-8 text-sm text-slate-500">
             <div className="flex flex-col items-center">
               <span className="font-bold text-lg text-green-600">{correctCount}</span>
               <span>Correct</span>
             </div>
             <div className="w-px h-10 bg-slate-200"></div>
             <div className="flex flex-col items-center">
               <span className="font-bold text-lg text-red-500">{totalQuestions - correctCount}</span>
               <span>Incorrect</span>
             </div>
             <div className="w-px h-10 bg-slate-200"></div>
             <div className="flex flex-col items-center">
               <span className="font-bold text-lg text-slate-800">{formatTime(timeSpent)}</span>
               <span>Time</span>
             </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onHome}
            className="flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
          >
            <Home size={20} />
            Back to Home
          </button>
          <button 
            onClick={onRetry}
            className="flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-colors"
          >
            <RotateCcw size={20} />
            Try Again
          </button>
        </div>

        {/* Review Answers */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 ml-2">Review Answers</h3>
          {quizSet.questions.map((q, idx) => {
            const userAnswer = answers.find(a => a.questionId === q.id);
            const correctOption = q.options.find(o => o.isCorrect);
            const isCorrect = checkAnswer(q, userAnswer);
            
            // Determine what to display as user's answer
            let userDisplay = "";
            if (q.type === QuestionType.SHORT_ANSWER) {
              userDisplay = userAnswer?.textAnswer || "(No Answer)";
            } else {
              const selectedOpt = q.options.find(o => o.id === userAnswer?.selectedOptionId);
              userDisplay = selectedOpt?.text || "(No Answer)";
            }

            return (
              <div key={q.id} className={`bg-white p-6 rounded-2xl border ${isCorrect ? 'border-slate-200' : 'border-red-100'} shadow-sm`}>
                <div className="flex gap-4">
                  <span className={`
                    flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mt-1
                    ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
                  `}>
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    
                    {/* Display Image in Review */}
                    {q.image && (
                      <div className="mb-4 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 max-w-sm">
                         <img src={q.image} alt="Question context" className="w-full h-auto object-cover max-h-48" />
                      </div>
                    )}

                    <p className="text-lg font-medium text-slate-800 mb-4">{q.text}</p>
                    
                    <div className="space-y-2">
                       {/* Show User Selection if Wrong */}
                       {!isCorrect && (
                         <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
                           <XCircle className="text-red-500" size={20} />
                           <span className="text-red-800 font-medium line-through decoration-red-400">{userDisplay}</span>
                           <span className="text-xs uppercase font-bold text-red-400 ml-auto">Your Answer</span>
                         </div>
                       )}

                       {/* Show Correct Answer */}
                       <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                         <CheckCircle2 className="text-green-600" size={20} />
                         <span className="text-green-900 font-medium">{correctOption?.text}</span>
                         <span className="text-xs uppercase font-bold text-green-600 ml-auto">Correct Answer</span>
                       </div>
                    </div>

                    {q.explanation && (
                      <div className="mt-4 p-4 bg-slate-50 rounded-xl text-slate-600 text-sm">
                        <span className="font-bold text-slate-800">Explanation:</span> {q.explanation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default QuizResult;