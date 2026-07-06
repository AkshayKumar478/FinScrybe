import bcrypt from "bcrypt";

export const hashValue = (value: string) => bcrypt.hash(value, 10);

export const compareValue = (value: string, hashedValue: string) =>
  bcrypt.compare(value, hashedValue);
