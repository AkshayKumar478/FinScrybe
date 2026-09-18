import { z } from "zod";
import { companyRegistrationSchema } from "../schemas/companyRegistration.schema";

export type CompanyRegistrationInput = z.infer<typeof companyRegistrationSchema>;

export interface CompanyRegistrationResponse {
  success: boolean;
  message: string;
  data?: unknown;
}
