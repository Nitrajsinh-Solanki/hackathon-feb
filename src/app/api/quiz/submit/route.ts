// hackathon-feb\src\app\api\quiz\submit\route.ts


import { NextResponse } from 'next/server';
import { saveQuizHistory } from '@/lib/mongodb/quizHistory';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, topic, subtopic, difficulty, questions, answers, timeTaken } = body;
    if (!userId || !topic || !subtopic || !difficulty) {
      return NextResponse.json({ 
          error: 'Missing required fields' 
      }, { status: 400 });
  }

    const totalQuestions = questions.length;
    const correctAnswers = answers.filter((a: any) => a.isCorrect).length;
    const percentage = (correctAnswers / totalQuestions) * 100;

    const quizHistory = {
      userId,
      topic,
      subtopic, 
      difficulty,
      questions: questions.map((q: any, i: number) => ({
        question: q.question,
        userAnswer: answers[i].selectedAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect: answers[i].isCorrect,
        explanation: q.explanation
      })),
      score: correctAnswers,
      totalQuestions,
      percentage,
      timeTaken
    };

    const savedQuiz = await saveQuizHistory(quizHistory);
    return NextResponse.json(savedQuiz);
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json({ error: 'Failed to submit quiz' }, { status: 500 });
  }
}
