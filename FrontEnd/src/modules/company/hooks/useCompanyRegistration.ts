import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { companyRegistrationSchema } from "../schemas/companyRegistration.schema";
import { CompanyRegistrationMessage } from "../../../common/constants/messages";

import type {
  CompanyRegistrationInput,
  VerifyRegistrationOtpInput,
} from "../types/companyRegistration.types";

import {
  startRegistration,
  verifyRegistrationOtp,
  resendRegistrationOtp,
  completeRegistration,
} from "../api/company.api";

export const useCompanyRegistration = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const [registrationStage, setRegistrationStage] = useState<
    "form" | "otp" | "success"
  >("form");

  const [registrationId, setRegistrationId] = useState<string | null>(null);

  const [verificationToken, setVerificationToken] = useState<string | null>(
    null
  );

  const [adminEmail, setAdminEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isVerifying, setIsVerifying] = useState(false);

  const [isResending, setIsResending] = useState(false);

  const [isCompleting, setIsCompleting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState(false);

  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const form = useForm<CompanyRegistrationInput>({
    resolver: zodResolver(companyRegistrationSchema),
    mode: "onTouched",
    defaultValues: {
      companyName: "",
      industry: "",
      companyEmail: "",
      companyPhone: "",
      gstin: "",
      adminFullName: "",
      adminEmail: "",
      adminPassword: "",
      adminPhoneNumber: "",
    },
  });

  const handleNextStep = async () => {
    const isValid = await form.trigger([
      "companyName",
      "industry",
      "companyEmail",
      "companyPhone",
      "gstin",
    ]);

    if (isValid) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const onSubmit = async (data: CompanyRegistrationInput) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await startRegistration(data);

      setRegistrationId(response.registrationId);
      setAdminEmail(data.adminEmail);
      setRegistrationStage("otp");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(
          err.message || CompanyRegistrationMessage.REGISTRATION_FAILED
        );
      } else {
        setError(CompanyRegistrationMessage.REGISTRATION_FAILED);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteRegistration = async (
    tokenParam?: string | unknown
  ) => {
    const token =
      typeof tokenParam === "string" && tokenParam.trim() !== ""
        ? tokenParam
        : verificationToken;

    if (!token) {
      setError(CompanyRegistrationMessage.REGISTRATION_TOKEN_MISSING);
      return;
    }

    try {
      setIsCompleting(true);
      setError(null);

      await completeRegistration({
        verificationToken: token,
      });

      setSuccess(true);
      setRegistrationStage("success");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(
          err.message ||
            CompanyRegistrationMessage.REGISTRATION_COMPLETION_FAILED
        );
      } else {
        setError(
          CompanyRegistrationMessage.REGISTRATION_COMPLETION_FAILED
        );
      }
    } finally {
      setIsCompleting(false);
    }
  };

  const handleRetryRegistration = async () => {
    await handleCompleteRegistration(verificationToken);
  };

  const handleVerifyOtp = async (otp: string) => {
    // If a verification token is already preserved from a previous verification,
    // do not call verifyRegistrationOtp again (backend will reject as email already verified).
    // Instead, retry registration completion directly with the saved token.
    if (verificationToken) {
      await handleCompleteRegistration(verificationToken);
      return;
    }

    let tokenToComplete: string;

    try {
      setIsVerifying(true);
      setError(null);
      setResendMessage(null);

      const payload: VerifyRegistrationOtpInput = {
        email: adminEmail,
        otp,
      };

      const response = await verifyRegistrationOtp(payload);

      tokenToComplete = response.verificationToken;
      setVerificationToken(response.verificationToken);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(
          err.message ||
            CompanyRegistrationMessage.OTP_VERIFICATION_FAILED
        );
      } else {
        setError(
          CompanyRegistrationMessage.OTP_VERIFICATION_FAILED
        );
      }
      return;
    } finally {
      setIsVerifying(false);
    }

    await handleCompleteRegistration(tokenToComplete);
  };

  const handleResendOtp = async () => {
    try {
      setIsResending(true);
      setError(null);
      setResendMessage(null);

      const response = await resendRegistrationOtp({
        email: adminEmail,
      });

      setResendMessage(response.message);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(
          err.message || CompanyRegistrationMessage.OTP_RESEND_FAILED
        );
      } else {
        setError(CompanyRegistrationMessage.OTP_RESEND_FAILED);
      }
    } finally {
      setIsResending(false);
    }
  };

  const canRetryCompletion = Boolean(verificationToken && !success);

  return {
    form,

    currentStep,
    registrationStage,

    registrationId,
    verificationToken,
    adminEmail,

    isSubmitting,
    isVerifying,
    isResending,
    isCompleting,
    canRetryCompletion,
    canRetryRegistration: canRetryCompletion,

    error,
    success,
    resendMessage,

    handleNextStep,
    handlePrevStep,

    onSubmit: form.handleSubmit(onSubmit),

    handleVerifyOtp,
    handleResendOtp,
    handleCompleteRegistration,
    handleRetryRegistration,
  };
};