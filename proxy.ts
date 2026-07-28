// proxy.ts
// Note: this file is NOT what protects /admin — app/admin/layout.tsx does
// that now. This file, per current Next.js guidance, is only appropriate
// for lightweight routing concerns (redirects, header rewrites), not
// security decisions. Leaving this minimal/empty is fine for this project —
// you can skip it entirely if you have no routing-level rewrites to do.

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [],
}