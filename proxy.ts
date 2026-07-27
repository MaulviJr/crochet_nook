import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  const isLoggedIn = req.cookies.get('admin_session')
  if (req.nextUrl.pathname.startsWith('/admin') && !req.nextUrl.pathname.startsWith('/admin/login')) {
    if (!isLoggedIn) return NextResponse.redirect(new URL('/admin/login', req.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*'] }