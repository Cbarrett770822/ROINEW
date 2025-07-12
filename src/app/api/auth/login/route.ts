console.log('[DEBUG] login route loaded');
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signJwt, JWTPayload } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/user';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    await connectToDatabase();
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const token = await signJwt({ userId: user._id, username: user.username, role: user.role });
    const res = NextResponse.json({ user: { username: user.username, email: user.email, role: user.role } });
    res.cookies.set('token', token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 });
    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
