import { z } from "zod";
import { CompanyStatus } from "../../../common/types";
import {ValidationMessage,CompanyAdminMessage,CompanyValidation, CompanyRegistrationMessage} from '../../../common/constants/messages'

export const companyRegistrationSchema = z.object({
  companyName: z.string().trim().min(1, CompanyValidation.COMPANY_NAME_REQUIRED),
  industry: z.string().trim().min(1, CompanyValidation.INDUSTRY_REQUIRED),
  companyEmail: z
    .string()
    .email(CompanyValidation.COMPANY_VALID_EMAIL)
    .trim()
    .toLowerCase(),
  companyPhone: z.string().trim().min(1, CompanyValidation.COMPANY_PHONE_REQUIRED),
  adminFullName: z
    .string()
    .trim()
    .min(1, CompanyAdminMessage.COMPANY_ADMIN_FULL_NAME),
  adminEmail: z
    .string()
    .email(CompanyAdminMessage.VALID_EMAIL_REQUIRED)
    .trim()
    .toLowerCase(),
  adminPassword: z.string().min(6, ValidationMessage.PASSWORD_MUST_CONTAIN),
  adminPhoneNumber: z
    .string()
    .trim()
    .min(1, CompanyAdminMessage.COMPANY_ADMIN_FULL_NAME),
});

export const companyIdParamsSchema = z.object({
  companyId: z.string().min(1,CompanyRegistrationMessage.COMPANY_ID_REQUIRED),
});

export const updateCompanyStatusSchema = z.object({
  status: z.nativeEnum(CompanyStatus),
});
export type CompanyRegistrationInput = z.infer<typeof companyRegistrationSchema>;