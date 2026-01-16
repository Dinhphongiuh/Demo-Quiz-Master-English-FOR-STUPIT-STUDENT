import React, { useState } from 'react';
import QuizDashboard from './components/QuizDashboard';
import QuizRunner from './components/QuizRunner';
import QuizResult from './components/QuizResult';
import VoicePractice from './components/VoicePractice';
import QuizEditor from './components/QuizEditor';
import PartSelectionModal from './components/PartSelectionModal';
import { QUIZ_SETS } from './data';
import { vocab_parts } from './data/vocabData';
import { QuizSet, UserAnswer } from './types';

type AppState = 'DASHBOARD' | 'QUIZ' | 'RESULT' | 'VOICE_PRACTICE' | 'EDITOR';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('DASHBOARD');
  const [activeQuizSet, setActiveQuizSet] = useState<QuizSet | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showPartSelection, setShowPartSelection] = useState(false);

  const handleSelectSet = (set: QuizSet) => {
    setActiveQuizSet(set);
    setAppState('QUIZ');
  };

  const handleSelectPart = (setId: string) => {
    if (setId === 'part1-vocabulary') {
      setShowPartSelection(true);
    }
  };

  const handleStartVocabPart = (part: 'part1' | 'part2' | 'part3' | 'part4' | 'random') => {
    setShowPartSelection(false);
    
    let questions;
    let titleSuffix = '';

    if (part === 'random') {
      // Pick 40 random questions from the full list
      const shuffled = [...vocab_parts.full].sort(() => 0.5 - Math.random());
      questions = shuffled.slice(0, 40);
      titleSuffix = 'Random Selection';
    } else {
      questions = vocab_parts[part];
      const partNumber = part.replace('part', '');
      titleSuffix = `Part ${partNumber}`;
    }

    const vocabSet: QuizSet = {
      id: `vocab-${part}`,
      title: `Vocabulary & Grammar: ${titleSuffix}`,
      description: 'Focus on 40 specific vocabulary questions.',
      difficulty: 'Medium',
      estimatedTime: 15,
      questions: questions
    };

    setActiveQuizSet(vocabSet);
    setAppState('QUIZ');
  };

  const handleRandomQuiz = () => {
    // Collect random questions from all sets
    const allQuestions = QUIZ_SETS.flatMap(set => set.questions);
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const randomQuestions = shuffled.slice(0, 15); // Pick 15 random questions

    const randomSet: QuizSet = {
      id: 'random-gen',
      title: 'Random Practice Test',
      description: 'A mix of vocabulary, grammar, and reading from all topics.',
      difficulty: 'Medium',
      estimatedTime: 15,
      questions: randomQuestions
    };

    setActiveQuizSet(randomSet);
    setAppState('QUIZ');
  };

  const handleVoicePractice = () => {
    setAppState('VOICE_PRACTICE');
  };

  const handleOpenEditor = () => {
    setAppState('EDITOR');
  };

  const handleQuizComplete = (answers: UserAnswer[], time: number) => {
    setUserAnswers(answers);
    setTimeSpent(time);
    setAppState('RESULT');
  };

  const handleExitQuiz = () => {
    // Confirmation is now handled inside QuizRunner UI
    setAppState('DASHBOARD');
    setActiveQuizSet(null);
  };

  const handleRetry = () => {
    setAppState('QUIZ');
  };

  const handleNextPart = () => {
    if (activeQuizSet && activeQuizSet.id.startsWith('vocab-part')) {
      const currentPartNum = parseInt(activeQuizSet.id.split('-part')[1]);
      if (currentPartNum < 4) {
        handleStartVocabPart(`part${currentPartNum + 1}` as any);
      } else {
        handleHome();
      }
    } else {
      handleHome();
    }
  };

  const handleHome = () => {
    setAppState('DASHBOARD');
    setActiveQuizSet(null);
  };

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen">
      
      {appState === 'DASHBOARD' && (
        <>
          <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">Q</div>
                <span className="text-xl font-bold tracking-tight">QuizMaster<span className="text-indigo-600">AI</span></span>
              </div>
              <div className="text-sm font-medium text-slate-500">TOÀN STUPIT</div>
            </div>
          </nav>
          <QuizDashboard 
            quizSets={QUIZ_SETS} 
            onSelectSet={handleSelectSet} 
            onRandomQuiz={handleRandomQuiz}
            onVoicePractice={handleVoicePractice}
            onOpenEditor={handleOpenEditor}
            onSelectPart={handleSelectPart}
          />
          {showPartSelection && (
            <PartSelectionModal 
              title="Select Vocabulary Part" 
              onClose={() => setShowPartSelection(false)} 
              onSelect={handleStartVocabPart} 
            />
          )}
        </>
      )}

      {appState === 'VOICE_PRACTICE' && (
        <VoicePractice onExit={handleHome} />
      )}

      {appState === 'EDITOR' && (
        <QuizEditor onExit={handleHome} />
      )}

      {appState === 'QUIZ' && activeQuizSet && (
        <QuizRunner 
          quizSet={activeQuizSet}
          onComplete={handleQuizComplete}
          onExit={handleExitQuiz}
        />
      )}

      {appState === 'RESULT' && activeQuizSet && (
        <QuizResult 
          quizSet={activeQuizSet}
          answers={userAnswers}
          timeSpent={timeSpent}
          onRetry={handleRetry}
          onHome={handleHome}
        />
      )}

    </div>
  );
};

export default App;