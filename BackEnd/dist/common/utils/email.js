"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const mail_1 = require("../../config/mail");
const env_1 = require("../../config/env");
const sendEmail = async (to, subject, html) => {
    await mail_1.transporter.sendMail({
        from: env_1.env.MAIL_FROM ?? env_1.env.SMTP_EMAIL,
        to,
        subject,
        html
    });
};
exports.sendEmail = sendEmail;
