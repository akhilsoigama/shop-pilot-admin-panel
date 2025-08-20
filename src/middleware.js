import { NextResponse } from 'next/server'

const publicPaths = [
  '/login',
  '/api/auth/login',
  '/api/product',
  '/api/product/id',
]

const allowedOrigins = [
  'http://localhost:3000',
  'https://shop-pilot-xi.vercel.app',
  'http://localhost:3001'
]

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  const response = NextResponse.next()
  
  const origin = request.headers.get('origin') || ''
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0]
  
  response.headers.set('Access-Control-Allow-Origin', allowedOrigin)
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: response.headers,
    })
  }
  
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return response
  }
  
  const token = request.cookies.get('token')?.value
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}