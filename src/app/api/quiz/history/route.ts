// hackathon-feb\src\app\api\quiz\history\route.ts


import { NextResponse } from 'next/server';
import { getUserQuizHistory,saveQuizHistory } from '@/lib/mongodb/quizHistory';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const history = await getUserQuizHistory(userId);
    return NextResponse.json(history);
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    return NextResponse.json({ error: 'Failed to fetch quiz history' }, { status: 500 });
  }
}



export async function POST(request: Request) {
  try {
    const quizData = await request.json();
    const savedHistory = await saveQuizHistory(quizData);
    return NextResponse.json(savedHistory);
  } catch (error) {
    console.error('Error saving quiz history:', error);
    return NextResponse.json({ error: 'Failed to save quiz history' }, { status: 500 });
  }
}