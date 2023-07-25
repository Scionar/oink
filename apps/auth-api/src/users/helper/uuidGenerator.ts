import crypto from 'crypto';

export const uuidGenerator = (id: number) => {
  const secret = `user-${id}-${Date.now() - 1}`;
  return crypto
    .createHash('shake256', {
      outputLength: 12,
    })
    .update(secret)
    .digest('hex');
};
