import { request } from "../../../config/api";

import type {
  CompanyRegistrationInput,
  RegistrationStartResponse,
  RegistrationOtpVerificationResponse,
  VerifyRegistrationOtpInput,
  ResendRegistrationOtpInput,
  RegistrationOtpResendResponse,
  CompleteRegistrationInput,
  CompleteRegistrationResponse,
} from "../types/companyRegistration.types";

export const startRegistration = async (
  payload: CompanyRegistrationInput
): Promise<RegistrationStartResponse> => {
  return request<RegistrationStartResponse>(
    "/companies/registration/start",
    {
      method: "POST",
      body: payload,
    }
  );
};

export const verifyRegistrationOtp = async (
  payload: VerifyRegistrationOtpInput
): Promise<RegistrationOtpVerificationResponse> => {
  return request<RegistrationOtpVerificationResponse>(
    "/companies/registration/verify-otp",
    {
      method: "POST",
      body: payload,
    }
  );
};

export const resendRegistrationOtp = async (
  payload: ResendRegistrationOtpInput
): Promise<RegistrationOtpResendResponse> => {
  return request<RegistrationOtpResendResponse>(
    "/companies/registration/resend-otp",
    {
      method: "POST",
      body: payload,
    }
  );
};

export const completeRegistration = async (
  payload: CompleteRegistrationInput
): Promise<CompleteRegistrationResponse> => {
  return request<CompleteRegistrationResponse>(
    "/companies/registration/complete",
    {
      method: "POST",
      body: payload,
    }
  );
};