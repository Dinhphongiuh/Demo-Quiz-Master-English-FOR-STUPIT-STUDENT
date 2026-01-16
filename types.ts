export enum QuestionType {
  MULTIPLE_CHOICE = 'Multiple Choice',
  SINGLE_CHOICE = 'Single Choice',
  TRUE_FALSE = 'True/False',
  SHORT_ANSWER = 'Short Answer'
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  image?: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  image?: string;
  audioUrl?: string; // Added for Listening tasks
  options: Option[];
  points: number;
  timeLimit: number; // in seconds
  required: boolean;
  explanation?: string;
  topic?: string;
}

export interface QuizSet {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: number; // minutes
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId?: string;
  textAnswer?: string;
}

// AI Service Types
export interface GeneratedQuestionResponse {
  questionText: string;
  options: { text: string; isCorrect: boolean }[];
  explanation: string;
}