import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { User } from '@/lib/models/User';
import dbConnect from '@/lib/mongodb/connect';

export async function GET() {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth_token');

    if (!authToken?.value) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = await User.findById(authToken.value);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ userId: user._id });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
