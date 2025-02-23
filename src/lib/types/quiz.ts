// hackathon-feb\src\lib\types\quiz.ts



export interface Question {
    topic: string;
    subtopic: string;
    difficulty: 'Basic' | 'Intermediate' | 'Advanced';
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }
  
  export interface QuizSettings {
    topic: string;
    subtopic: string;
    difficulty: string;
    numberOfQuestions: number;
  }
  
  export interface QuizResponse {
    questions: Question[];
    quizId: string;
  }
  
  export interface QuizSubmission {
    quizId: string;
    userId: string;
    answers: {
      questionId: string;
      selectedAnswer: string;
      isCorrect: boolean;
    }[];
  }
  
  export interface QuizResult {
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    percentage: number;
    timeTaken: number;
    questions: {
      question: string;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  }
  