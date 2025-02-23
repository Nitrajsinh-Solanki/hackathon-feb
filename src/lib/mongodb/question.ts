// hackathon-feb\src\lib\mongodb\question.ts

import mongoose from 'mongoose';
import { Question } from '../models/QuestionSchema';
import dbConnect from './connect';
import { generateQuestion } from '../ai/gemini';
import { mathTopics } from '@/utils/mathTopics';

export async function saveQuestion(questionData: any) {
  try {
    await dbConnect();
    const question = new Question({
      topic: questionData.topic,
      subtopic: questionData.subtopic,
      difficulty: questionData.difficulty,
      question: questionData.question,
      options: questionData.options,
      correctAnswer: questionData.correctAnswer,
      explanation: questionData.explanation || ''
    });
    await question.save();
    return question;
  } catch (error) {
    console.error('Error saving question:', error);
    throw error;
  }
}


export async function getQuestionsByTopic(topic: string, subtopic: string, limit: number) {
  try {
    const questions = await Question.find({ topic, subtopic })
      .limit(limit)
      .exec();
    return questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}

export async function getRandomQuestions(topic: string, subtopic: string | null, difficulty: string, count: number) {
  try {
    await dbConnect();
    const actualSubtopic = subtopic || 
      mathTopics.find(t => t.title === topic)?.subtopics[0] || 
      'General';
    
    const matchQuery = {
      topic,
      difficulty,
      ...(subtopic && { subtopic })
    };

    let questions = await Question.aggregate([
      { $match: matchQuery },
      { $sample: { size: count } }
    ]).exec();

    if (questions.length < count) {
      const remainingCount = count - questions.length;
      const generatedQuestions = [];
      
      for (let i = 0; i < remainingCount; i++) {
        try {
          const newQuestion = await generateQuestion(topic, subtopic, difficulty);
          const savedQuestion = await saveQuestion(newQuestion);
          generatedQuestions.push(savedQuestion);
          
          // Break if we've generated enough questions
          if (generatedQuestions.length + questions.length >= count) {
            break;
          }
        } catch (genError) {
          console.error('Error generating individual question:', genError);
        }
      }

      questions = [...questions, ...generatedQuestions];
    }

    return questions.slice(0, count);
  } catch (error) {
    console.error('Error fetching random questions:', error);
    throw error;
  }
}
