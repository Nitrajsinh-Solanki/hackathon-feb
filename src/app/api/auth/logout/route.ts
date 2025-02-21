// hackathon-feb\src\app\api\auth\logout\route.ts

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  
  // Remove the auth token
  cookieStore.delete('auth_token')

  return NextResponse.json({ 
    message: 'Logged out successfully',
    redirect: '/'
  })
}
