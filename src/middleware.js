import { NextResponse } from 'next/server'

const publicPaths = [
  '/login',
  '/api/auth/login',
  '/api/product',
]

export function middleware(request) {
  const { pathname } = request.nextUrl

  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  const token = request.cookies.get('token')?.value

  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}