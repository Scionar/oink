import { Injectable } from '@nestjs/common';
import path from 'path';
import fs from 'fs';

@Injectable()
export class AuthService {
  async getPublicKey(): Promise<string> {
    const publicKeyPath = path.resolve(__dirname, '../../', 'public.pem');
    let publicKey: string;

    if (!fs.existsSync(publicKeyPath))
      throw new Error('Public key does not exist');

    try {
      publicKey = fs.readFileSync(publicKeyPath, 'utf8');
    } catch (err) {
      throw new Error('Failed to read public key');
    }

    return publicKey;
  }
}
