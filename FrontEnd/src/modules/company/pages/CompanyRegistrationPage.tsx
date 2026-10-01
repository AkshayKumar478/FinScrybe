import { Link } from "react-router-dom";
import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
import { useCompanyRegistration } from "../hooks/useCompanyRegistration";
import { CompanyDetailsStep } from "../components/CompanyDetailsStep";
import { PrimaryAdminDetailsStep } from "../components/PrimaryAdminDetailsStep";
import { RegistrationStepIndicator } from "../components/RegistrationStepIndicator";
import { FinScrybeWordmark } from "../components/FinScrybeWordmark";
import { OtpVerificationStep } from "../../../common/components/OtpVerificationStep";

export const CompanyRegistrationPage = () => {
  const {
    form,
    currentStep,
    registrationStage,
    adminEmail,
    verificationToken,
    canRetryCompletion,
    isSubmitting,
    isVerifying,
    isResending,
    isCompleting,
    error,
    success,
    resendMessage,
    handleNextStep,
    handlePrevStep,
    onSubmit,
    handleVerifyOtp,
    handleResendOtp,
    handleRetryRegistration,
  } = useCompanyRegistration();

  const renderFooter = () => (
    <footer className="mt-8 text-center text-xs text-slate-400 space-y-2">
      <div className="flex items-center justify-center gap-4">
        <a
          href="#privacy"
          onClick={(e) => e.preventDefault()}
          className="hover:text-slate-600 transition-colors"
        >
          Privacy Policy
        </a>
        <span>&bull;</span>
        <a
          href="#terms"
          onClick={(e) => e.preventDefault()}
          className="hover:text-slate-600 transition-colors"
        >
          Terms of Service
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} FinScrybe Inc. All rights reserved.</p>
    </footer>
  );

  if (success) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between py-8 sm:py-12 px-4 sm:px-6 font-sans text-slate-900 antialiased">
        <div className="w-full max-w-[460px] mx-auto my-auto">
          <FinScrybeWordmark />

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_24px_rgba(15,23,42,0.06)] p-6 sm:p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Registration Successful!
            </h2>

            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Your company has been registered successfully. Please login to
              continue to your dashboard.
            </p>

            <Link
              to="/login"
              className="w-full py-2.5 px-4 bg-[#635BFF] hover:bg-[#5448F7] active:bg-[#483ee6] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center justify-center"
            >
              Go to Login
            </Link>
          </div>
        </div>

        {renderFooter()}
      </div>
    );
  }

  if (registrationStage === "otp") {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between py-8 sm:py-12 px-4 sm:px-6 font-sans text-slate-900 antialiased">
        <div className="w-full max-w-[460px] mx-auto my-auto">
          <FinScrybeWordmark />

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_24px_rgba(15,23,42,0.06)] p-6 sm:p-8">
            <RegistrationStepIndicator currentStep={3} />

            <OtpVerificationStep
              adminEmail={adminEmail}
              onVerify={handleVerifyOtp}
              onResend={handleResendOtp}
              isVerifying={isVerifying}
              isResending={isResending}
              isCompleting={isCompleting}
              verificationToken={verificationToken}
              canRetryRegistration={
                canRetryCompletion || Boolean(verificationToken && !success)
              }
              onRetryRegistration={handleRetryRegistration}
              error={error}
              successMessage={resendMessage}
            />
          </div>
        </div>

        {renderFooter()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between py-8 sm:py-12 px-4 sm:px-6 font-sans text-slate-900 antialiased">
      <div className="w-full max-w-[460px] mx-auto my-auto">
        <FinScrybeWordmark />

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_24px_rgba(15,23,42,0.06)] p-6 sm:p-8">
          <RegistrationStepIndicator currentStep={currentStep} />

          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {currentStep === 1
                ? "Register your company"
                : "Primary Admin Details"}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {currentStep === 1
                ? "Enter your company details to set up your business account."
                : "Create the primary administrator account for your company."}
            </p>
          </div>

          {error && (
            <div className="mb-5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            {currentStep === 1 && <CompanyDetailsStep form={form} />}

            {currentStep === 2 && <PrimaryAdminDetailsStep form={form} />}

            <div className="pt-2">
              {currentStep === 1 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-2.5 px-4 bg-[#635BFF] hover:bg-[#5448F7] active:bg-[#483ee6] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Next: Admin Details
                </button>
              ) : (
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 bg-[#635BFF] hover:bg-[#5448F7] active:bg-[#483ee6] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle className="animate-spin" size={16} />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit Registration</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Back to Company Info
                  </button>
                </div>
              )}
            </div>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6 pt-4 border-t border-slate-100">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#635BFF] hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      {renderFooter()}
    </div>
  );
};