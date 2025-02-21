// hackathon-feb\src\app\api\auth\register\route.ts



import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb/connect'
import bcrypt from 'bcryptjs'
import { User } from '@/lib/models/User'
import { sendOTP } from '@/lib/email/gmail'

export async function POST(request: Request) {
  try {
    await connectToDatabase()
    
    const { username, email, password } = await request.json()
    
    // Add console.log for debugging
    console.log('Registration attempt:', { username, email })
    
    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000)
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      otp: {
        code: otp,
        expiresAt: otpExpiresAt
      }
    })

    const emailSent = await sendOTP(email, otp)
    
    if (!emailSent) {
      await User.deleteOne({ _id: user._id })
      return NextResponse.json(
        { message: 'Failed to send verification email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'Registration successful. Please check your email for verification.',
      email: email,
      redirect: `/verify-otp?email=${encodeURIComponent(email)}`
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Registration failed: ' + error },
      { status: 500 }
    )
  }
}
