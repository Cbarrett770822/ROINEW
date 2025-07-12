import { NextRequest, NextResponse } from 'next/server';

export async function POST(_req: NextRequest): Promise<NextResponse> {
  const res = NextResponse.json({ message: 'Logged out' });
  res.cookies.set('token', '', { httpOnly: true, expires: new Date(0), path: '/' });
  return res;
}
