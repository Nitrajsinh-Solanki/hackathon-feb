// hackathon-feb\src\lib\mongodb\quizHistory.ts


import mongoose from 'mongoose';
import { QuizHistory } from '../models/QuizHistory';

export async function saveQuizHistory(quizData: any) {
  try {
    const quizHistory = new QuizHistory(quizData);
    await quizHistory.save();
    return quizHistory;
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
