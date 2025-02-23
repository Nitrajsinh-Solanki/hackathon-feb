// hackathon-feb\src\app\api\quiz\history\route.ts


import { NextResponse } from 'next/server';
import { getUserQuizHistory } from '@/lib/mongodb/quizHistory';

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
