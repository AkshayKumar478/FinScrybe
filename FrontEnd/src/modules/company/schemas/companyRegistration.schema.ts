import { z } from "zod";

export const companyRegistrationSchema = z.object({
  companyName: z.string().trim().min(1, "Company Name is required"),
  industry: z.string().trim().min(1, "Industry is required"),
  companyEmail: z.string().email("Invalid company email").trim().toLowerCase(),
  companyPhone: z.string().trim().min(10, "Phone number must be at least 10 digits"),
  gstin: z
    .string()
    .trim()
    .min(1, "GSTIN is required")
    .toUpperCase()
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
      "Invalid GSTIN format"
    ),
  adminFullName: z.string().trim().min(1, "Admin full name is required"),
  adminEmail: z.string().email("Invalid admin email").trim().toLowerCase(),
  adminPassword: z.string().min(6, "Password must be at least 6 characters"),
  adminPhoneNumber: z.string().trim().min(1, "Admin phone number is required"),
});
