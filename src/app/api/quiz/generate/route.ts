// hackathon-feb\src\app\api\quiz\generate\route.ts

import { NextResponse } from 'next/server';
import { getRandomQuestions } from '@/lib/mongodb/question';
import dbConnect from '@/lib/mongodb/connect';
import { mathTopics } from '@/utils/mathTopics';




export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { topic, subtopic, difficulty, numberOfQuestions } = body;

    // Strictly enforce the question limit
    const count = Math.min(parseInt(numberOfQuestions) || 5, 20);

    const questions = await getRandomQuestions(
      topic,
      subtopic || null,
      difficulty,
      count
    );

    // Ensure exact number of questions requested
    const limitedQuestions = questions.slice(0, count);

    return NextResponse.json({
      questions: limitedQuestions,
      quizId: new Date().getTime().toString()
    });
  } catch (error) {
    console.error('Error generating quiz:', error);
    return NextResponse.json({ error: 'Failed to generate quiz' }, { status: 500 });
  }
}
