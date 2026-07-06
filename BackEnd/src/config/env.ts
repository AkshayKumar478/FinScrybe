import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum([
        "development",
        "production",
        "test",
    ]),

    PORT: z.coerce.number(),

    MONGODB_URI: z.string(),
    JWT_ACCESS_SECRET: z.string(),

    JWT_ACCESS_EXPIRES_IN: z.string(),

    JWT_REFRESH_SECRET: z.string(),

    JWT_REFRESH_EXPIRES_IN: z.string(),

    SMTP_HOST: z.string(),

    SMTP_PORT: z.coerce.number(),

    SMTP_EMAIL: z.string().email(),

    MAIL_FROM: z.string().email().optional(),

    SMTP_PASSWORD: z.string(),

    CLIENT_URL: z.string().url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error(parsedEnv.error.format());

    throw new Error("Invalid Environment Variables");
}

export const env = parsedEnv.data;
