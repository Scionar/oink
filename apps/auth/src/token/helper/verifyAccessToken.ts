import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';

export const verifyAccessToken = (accessToken: string): boolean => {
  const publicKeyPath = path.resolve(__dirname, '../../../../', 'public.pem');
  let publicKey: string;

  if (!fs.existsSync(publicKeyPath))
    throw new Error('Public key does not exist');

  try {
    publicKey = fs.readFileSync(publicKeyPath, 'utf8');
  } catch (err) {
    throw new Error('Failed to read public key');
  }

  try {
    jwt.verify(accessToken, publicKey, {
      algorithms: ['RS256'],
    });
  } catch {
    return false;
  }

  return true;
};
