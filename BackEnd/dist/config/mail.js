"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMailConnection = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("./env");
exports.transporter = nodemailer_1.default.createTransport({
    host: env_1.env.SMTP_HOST,
    port: env_1.env.SMTP_PORT,
    secure: env_1.env.SMTP_PORT === 465,
    auth: {
        user: env_1.env.SMTP_EMAIL,
        pass: env_1.env.SMTP_PASSWORD,
    },
});
/**
 * Verifies the SMTP connection when the server starts.
 */
const verifyMailConnection = async () => {
    try {
        await exports.transporter.verify();
        console.log("✅ Mail Server Connected Successfully");
    }
    catch (error) {
        console.error("❌ Mail Server Connection Failed");
        if (error instanceof Error) {
            console.error(error.message);
        }
        process.exit(1);
    }
};
exports.verifyMailConnection = verifyMailConnection;
