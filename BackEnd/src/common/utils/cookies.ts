import { CookieOptions } from "express";

import { env } from "../../config/env";

const isProduction = env.NODE_ENV === "production";

export const accessTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
  maxAge: 15 * 60 * 1000, 
};

export const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, 
};