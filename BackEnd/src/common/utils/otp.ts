
export const getOtpExpiry = (
  expiresInMinutes: number
): Date => {
  return new Date(
    Date.now() + expiresInMinutes * 60 * 1000
  );
};