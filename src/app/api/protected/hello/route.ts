import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const token = req.cookies.get('token')?.value;
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized - No token provided' }, { status: 401 });
  }
  
  const decoded = await verifyJwt(token);
  
  if (!decoded) {
    return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 });
  }
  
  return NextResponse.json({ 
    message: `Hello, ${decoded.username}!`, 
    user: decoded 
  });
}
