import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

export const generateAccessToken = (user: object): string => {
  const privateKeyPath = path.resolve(__dirname, '../../../../', 'private.pem');
  let privateKey: string;

  const payload = {
    iss: 'oink-auth',
    role: 'user',
    sub: user['account'],
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  };

  if (!fs.existsSync(privateKeyPath))
    throw new Error('Private key does not exist');

  try {
    privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  } catch (err) {
    throw new Error('Failed to read private key');
  }

  const accessToken = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
  return accessToken;
};
