declare module 'jose' {
  export interface JWTPayload {
    [key: string]: any;
  }

  export interface JWTVerifyResult {
    payload: JWTPayload;
    protectedHeader: {
      alg: string;
      [key: string]: any;
    };
  }

  export class SignJWT {
    constructor(payload: JWTPayload);
    setProtectedHeader(header: { alg: string; [key: string]: any }): this;
    setIssuedAt(): this;
    setExpirationTime(time: string | number): this;
    sign(key: Uint8Array): Promise<string>;
  }

  export function jwtVerify(
    jwt: string,
    key: Uint8Array
  ): Promise<JWTVerifyResult>;
}
