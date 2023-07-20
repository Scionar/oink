import jwt from 'jsonwebtoken';

export const verifyAccessToken = (
  accessToken: string,
  publicKey: string,
): boolean => {
  try {
    jwt.verify(accessToken, publicKey, {
      algorithms: ['RS256'],
    });
  } catch {
    return false;
  }

  return true;
};
