import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE_NAME, verifySessionToken } from '@/lib/auth'

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl
  const session = verifySessionToken(req.cookies.get(AUTH_COOKIE_NAME)?.value)

  if (pathname.startsWith('/dashboard') && !session) {
    const loginUrl = new URL('/login', req.url)
    const from = `${pathname}${search}`
    if (from !== '/dashboard') {
      loginUrl.searchParams.set('from', from)
    }
    return NextResponse.redirect(loginUrl)
  }

  if (pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}
