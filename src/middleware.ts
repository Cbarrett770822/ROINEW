import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Only protect API routes except for auth endpoints
  if (request.nextUrl.pathname.startsWith('/api') &&
      !request.nextUrl.pathname.startsWith('/api/auth')) {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized - No token provided' }, { status: 401 });
    }
    
    const payload = await verifyJwt(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
