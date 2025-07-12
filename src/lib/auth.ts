import { jwtVerify, SignJWT } from 'jose';
import { NextRequest } from 'next/server';

// Define the JWTPayload interface with an index signature
export interface JWTPayload {
  userId?: string;
  username?: string;
  role?: string;
  iat?: number;
  exp?: number;
  [key: string]: string | number | boolean | undefined; // More specific index signature
}

// Use TextEncoder to convert the secret to Uint8Array as required by jose
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SECRET = new TextEncoder().encode(JWT_SECRET);
const JWT_EXPIRES_IN = '1d';

export async function signJwt(payload: JWTPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(SECRET);
}

export async function verifyJwt(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as JWTPayload;
  } catch (e) {
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const cookie = req.cookies.get('token');
  return cookie?.value || null;
}
