// hackathon-feb\src\lib\models\QuizHistory.ts



import mongoose from 'mongoose';

const QuizHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  subtopic: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  questions: [{
    question: String,
    userAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean,
    explanation: String,
  }],
  score: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  timeTaken: {
    type: Number,
    required: true,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  }
});

export const QuizHistory = mongoose.models.QuizHistory || mongoose.model('QuizHistory', QuizHistorySchema);
