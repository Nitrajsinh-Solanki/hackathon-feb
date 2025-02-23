// hackathon-feb\src\lib\models\QuestionSchema.ts



import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
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
    enum: ['Basic', 'Intermediate', 'Advanced'],
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: [{
    type: String,
    required: true,
  }],
  correctAnswer: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  aiGenerated: {
    type: Boolean,
    default: true,
  }
});

export const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);
