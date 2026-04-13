import { NextResponse } from 'next/server'

// Next.js 16 uses proxy.js instead of middleware.js.
// Injects x-pathname header so server-component layouts can detect
// the current route without usePathname (which is client-only).
// Auth protection is handled by AdminProtected server component.
export function proxy(req) {
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-pathname', req.nextUrl.pathname)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/admin/:path*'],
}
