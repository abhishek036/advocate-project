import { NextRequest, NextResponse } from 'next/server'

const STUDIO_SECRET = process.env.STUDIO_SECRET
const COOKIE_NAME = 'rv_studio_auth'
const LOGIN_PATH = '/studio-login'
const STUDIO_PATH = '/studio'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith(STUDIO_PATH) || pathname.startsWith(LOGIN_PATH)) {
    return NextResponse.next()
  }

  if (!STUDIO_SECRET) {
    console.warn('[Security] STUDIO_SECRET env var not set — studio is unprotected!')
    return NextResponse.next()
  }

  const authCookie = request.cookies.get(COOKIE_NAME)
  if (authCookie?.value === STUDIO_SECRET) {
    return NextResponse.next()
  }

  const loginUrl = new URL(LOGIN_PATH, request.url)
  loginUrl.searchParams.set('from', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/studio', '/studio/:path*'],
}
