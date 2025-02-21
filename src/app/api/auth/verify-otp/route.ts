// hackathon-feb\src\app\api\auth\verify-otp\route.ts




import { NextResponse } from 'next/server'
import { User } from '@/lib/models/User'
import { connectToDatabase } from '@/lib/mongodb/connect'

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json()
    
    // Validate email presence
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      )
    }

    await connectToDatabase()
    
    // Search for user with original email
    const user = await User.findOne({ email })
    console.log('Verification attempt for:', email)
    console.log('User found:', !!user)
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    // Validate OTP
    if (!otp) {
      return NextResponse.json(
        { message: 'OTP is required' },
        { status: 400 }
      )
    }

    if (!user.otp?.code) {
      return NextResponse.json(
        { message: 'OTP not found' },
        { status: 400 }
      )
    }

    if (user.otp.code !== otp) {
      return NextResponse.json(
        { message: 'Invalid OTP' },
        { status: 400 }
      )
    }

    if (new Date() > new Date(user.otp.expiresAt)) {
      return NextResponse.json(
        { message: 'OTP has expired' },
        { status: 400 }
      )
    }

    // Update user verification status
    await User.updateOne(
      { email },
      { 
        $set: { isVerified: true },
        $unset: { otp: "" }
      }
    )

    return NextResponse.json({ 
      message: 'Email verified successfully',
      redirect: '/login'
    })
    
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { message: 'Verification failed' },
      { status: 500 }
    )
  }
}
