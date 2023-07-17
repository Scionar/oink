import crypto from 'crypto';

export const hashGenerator = (password: string, salt: string) => {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex'); 
}