import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';

export function middleware(request: NextRequest) {
  // Only protect API routes except for auth endpoints
  if (request.nextUrl.pathname.startsWith('/api') &&
      !request.nextUrl.pathname.startsWith('/api/auth')) {
    const token = request.cookies.get('token')?.value;
    if (!token || !verifyJwt(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
