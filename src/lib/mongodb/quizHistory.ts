// hackathon-feb\src\lib\mongodb\quizHistory.ts

import mongoose from 'mongoose';
import { QuizHistory } from '../models/QuizHistory';

// Ensure MongoDB is connected before executing queries
if (!mongoose.connection.readyState) {
  console.error('MongoDB is not connected. Ensure connection before calling DB functions.');
}

export async function saveQuizHistory(quizData: any) {
  try {
    const quizHistory = new QuizHistory(quizData);
    return await quizHistory.save(); // Ensuring it's saved before returning
  } catch (error) {
    console.error('Error saving quiz history:', error);
    throw error;
  }
}

export async function getUserQuizHistory(userId: string) {
  try {
    const history = await QuizHistory.find({ userId })
      .sort({ completedAt: -1 })
      .exec();
    return history;
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    throw error;
  }
}

export async function getQuizHistoryById(quizId: string) {
  try {
    const quiz = await QuizHistory.findById(quizId).exec();
    return quiz;
  } catch (error) {
    console.error('Error fetching quiz:', error);
    throw error;
  }
}
