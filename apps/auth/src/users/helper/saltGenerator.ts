import crypto from 'crypto';

export const saltGenerator = () => crypto.randomBytes(12).toString("base64");