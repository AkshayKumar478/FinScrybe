import { z } from "zod";
import {ValidationMessage} from '../../../common/constants/messages'

export const superAdminLoginSchema = z.object({
  email: z.string().email(ValidationMessage.INVALID_EMAIL).trim().toLowerCase(),
  password: z.string().min(8, ValidationMessage.PASSWORD_MUST_CONTAIN),
});


export type SuperAdminLoginInput= z.infer<typeof superAdminLoginSchema>
