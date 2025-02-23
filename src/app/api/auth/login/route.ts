// hackathon-feb\src\app\api\auth\login\route.ts





import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb/connect'
import bcrypt from 'bcryptjs'
import { User } from '@/lib/models/User'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    await dbConnect()
    
    const { email, password } = await request.json()
    const user = await User.findOne({ email })
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 400 }
      )
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { message: 'Please verify your email first' },
        { status: 400 }
      )
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 400 }
      )
    }

    const cookieStore = await cookies()
    cookieStore.set('auth_token', user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 
    })

    return NextResponse.json({ 
      message: 'Login successful',
      redirect: '/dashboard'
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Login failed' },
      { status: 500 }
    )
  }
}
