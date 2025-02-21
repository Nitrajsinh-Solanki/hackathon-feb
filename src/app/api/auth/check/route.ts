// hackathon-feb\src\app\api\auth\check\route.ts

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')

  if (!authToken) {
    return NextResponse.json({ 
      isAuthenticated: false 
    }, { 
      status: 401 
    })
  }

  return NextResponse.json({ 
    isAuthenticated: true 
  })
}
