import { z } from "zod";
import { companyRegistrationSchema } from "../schemas/companyRegistration.schema";

export type CompanyRegistrationInput = z.infer<
  typeof companyRegistrationSchema
>;

export interface RegistrationStartResponse {
  registrationId: string;
  message: string;
}

export interface VerifyRegistrationOtpInput {
  email: string;
  otp: string;
}

export interface RegistrationOtpVerificationResponse {
  message: string;
  verificationToken: string;
}

export interface ResendRegistrationOtpInput {
  email: string;
}

export interface RegistrationOtpResendResponse {
  message: string;
}

export interface CompleteRegistrationInput {
  verificationToken: string;
}

export interface CompleteRegistrationResponse {
  message: string;
  company: {
    id: string;
    companyName: string;
    companyEmail: string;
    gstin: string;
  };
  companyAdmin: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
  };
}
