"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenCookieOptions = exports.accessTokenCookieOptions = void 0;
const env_1 = require("../../config/env");
const isProduction = env_1.env.NODE_ENV === "production";
exports.accessTokenCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
};
exports.refreshTokenCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};
