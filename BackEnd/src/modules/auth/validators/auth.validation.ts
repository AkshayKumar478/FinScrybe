import { z } from "zod";

export const superAdminLoginSchema = z.object({
  email: z.string().email("A valid email is required").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

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

export const companyAdminLoginSchema = z.object({
  email: z.string().email("A valid email is required").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export const accountantLoginSchema = z.object({
  email: z.string().email("A valid email is required").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export type SuperAdminLoginInput = z.infer<typeof superAdminLoginSchema>;
export type CompanyRegistrationInput = z.infer<typeof companyRegistrationSchema>;
export type CompanyAdminLoginInput = z.infer<typeof companyAdminLoginSchema>;
export type AccountantLoginInput = z.infer<typeof accountantLoginSchema>;
