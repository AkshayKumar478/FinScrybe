import nodemailer from "nodemailer";
import { env } from "./env";

export const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,

    auth: {
        user: env.SMTP_EMAIL,
        pass: env.SMTP_PASSWORD,
    },
});

/**
 * Verifies the SMTP connection when the server starts.
 */
export const verifyMailConnection = async (): Promise<void> => {
    try {
        await transporter.verify();
        console.log("✅ Mail Server Connected Successfully");
    } catch (error) {
        console.error("❌ Mail Server Connection Failed");

        if (error instanceof Error) {
            console.error(error.message);
        }

        process.exit(1);
    }
};