"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum([
        "development",
        "production",
        "test",
    ]),
    PORT: zod_1.z.coerce.number(),
    MONGODB_URI: zod_1.z.string(),
    JWT_ACCESS_SECRET: zod_1.z.string(),
    JWT_ACCESS_EXPIRES_IN: zod_1.z.string(),
    JWT_REFRESH_SECRET: zod_1.z.string(),
    JWT_REFRESH_EXPIRES_IN: zod_1.z.string(),
    SMTP_HOST: zod_1.z.string(),
    SMTP_PORT: zod_1.z.coerce.number(),
    SMTP_EMAIL: zod_1.z.string().email(),
    MAIL_FROM: zod_1.z.string().email().optional(),
    SMTP_PASSWORD: zod_1.z.string(),
    CLIENT_URL: zod_1.z.string().url(),
});
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error(parsedEnv.error.format());
    throw new Error("Invalid Environment Variables");
}
exports.env = parsedEnv.data;
