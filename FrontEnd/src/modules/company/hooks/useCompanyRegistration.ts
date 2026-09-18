import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyRegistrationSchema } from "../schemas/companyRegistration.schema";
import type { CompanyRegistrationInput } from "../types/companyRegistration.types";
import { registerCompany } from "../api/company.api";

export const useCompanyRegistration = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

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
      await registerCompany(data);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    currentStep,
    isSubmitting,
    error,
    success,
    handleNextStep,
    handlePrevStep,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
