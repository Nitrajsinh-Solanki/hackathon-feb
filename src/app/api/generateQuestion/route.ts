// hackathon-feb\src\app\api\generateQuestion\route.ts

import { NextResponse } from 'next/server';
import { generateQuestion } from '@/lib/ai/gemini';
import { saveQuestion } from '@/lib/mongodb/question';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic, subtopic, difficulty, previousQuestion } = body;
    const question = await generateQuestion(topic, subtopic, difficulty, previousQuestion);
    await saveQuestion(question);
    return NextResponse.json(question);
  } catch (error) {
    console.error('Error in generate question API:', error);
    return NextResponse.json({ error: 'Failed to generate question' }, { status: 500 });
  }
}
