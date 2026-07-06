import { transporter } from "../../config/mail";
import { env } from "../../config/env";

export const sendEmail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: env.MAIL_FROM ?? env.SMTP_EMAIL,
    to,
    subject,
    html
  });
};
