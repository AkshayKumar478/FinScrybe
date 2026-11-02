
export const getExpiry = (
  expiresInMinutes: number
): Date => {
  return new Date(
    Date.now() + expiresInMinutes * 60 * 1000
  );
};