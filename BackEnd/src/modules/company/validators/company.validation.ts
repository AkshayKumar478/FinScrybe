import { z } from "zod";
import { CompanyStatus } from "../../../common/types";

export const companyRegistrationSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required"),
  industry: z.string().trim().min(1, "Industry is required"),
  companyEmail: z
    .string()
    .email("A valid company email is required")
    .trim()
    .toLowerCase(),
  companyPhone: z.string().trim().min(1, "Company phone is required"),
  adminFullName: z
    .string()
    .trim()
    .min(1, "Admin full name is required"),
  adminEmail: z
    .string()
    .email("A valid admin email is required")
    .trim()
    .toLowerCase(),
  adminPassword: z.string().min(6, "Password must be at least 6 characters"),
  adminPhoneNumber: z
    .string()
    .trim()
    .min(1, "Admin phone number is required"),
});

export const companyIdParamsSchema = z.object({
  companyId: z.string().min(1, "Company id is required"),
});

export const updateCompanyStatusSchema = z.object({
  status: z.nativeEnum(CompanyStatus),
});
export type CompanyRegistrationInput = z.infer<typeof companyRegistrationSchema>;