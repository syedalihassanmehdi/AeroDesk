import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE_NAME, createSessionToken, isValidAdminLogin } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }

    if (!isValidAdminLogin(email, password)) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: createSessionToken(email),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Unable to sign in.' }, { status: 500 })
  }
}
