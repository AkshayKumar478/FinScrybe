import {IEmailService} from './email.service.interface'

import {transporter} from '../../../config/mail'
import { env } from '../../../config/env';
class EmailService implements IEmailService{
    async sendEmail(to:string,subject:string,html:string):Promise<void>{
      await transporter.sendMail({
        from:env.SMTP_EMAIL,
        to,
        subject,
        html
      })
    }
}

export const emailService= new EmailService()