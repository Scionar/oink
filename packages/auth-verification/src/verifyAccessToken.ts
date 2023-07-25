import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyAccessToken = (
  accessToken: string,
  publicKey: string,
): string | JwtPayload => {
  let payload: string | JwtPayload;

  try {
    payload = jwt.verify(accessToken, publicKey, {
      algorithms: ['RS256'],
    });
  } catch {
    throw new Error('Invalid access token');
  }

  return payload;
};
