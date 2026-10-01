import React, { useState, useRef, useEffect } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Mail, RefreshCw } from "lucide-react";

export interface OtpVerificationProps {
  adminEmail: string;

  email?: string;

  onVerify: (otp: string) => void | Promise<void>;

  onResend: () => void | Promise<void>;

  isVerifying?: boolean;

  isResending?: boolean;

  isLoading?: boolean;

  error?: string | null;

  successMessage?: string | null;

  success?: string | null;

  onBack?: () => void;

  title?: string;

  description?: string;

  /** Whether registration completion is in progress */
  isCompleting?: boolean;

  /** Stored verification token from successful OTP verification */
  verificationToken?: string | null;

  /** Whether the user can retry registration completion with saved token */
  canRetryRegistration?: boolean;

  /** Alternative alias for canRetryRegistration */
  canRetryCompletion?: boolean;

  /** Alternative alias indicating verification token exists */
  hasVerificationToken?: boolean;

  /** Callback fired to retry registration completion using saved token */
  onRetryRegistration?: () => void | Promise<void>;

  /** Alternative alias for onRetryRegistration */
  onRetryCompletion?: () => void | Promise<void>;
}


export const OtpVerificationStep: React.FC<OtpVerificationProps> = ({
  adminEmail,
  email,
  onVerify,
  onResend,
  isVerifying = false,
  isResending = false,
  isLoading = false,
  error = null,
  successMessage = null,
  success = null,
  onBack,
  title = "Verify Your Email",
  description,
  isCompleting = false,
  verificationToken = null,
  canRetryRegistration = false,
  canRetryCompletion = false,
  hasVerificationToken = false,
  onRetryRegistration,
  onRetryCompletion,
}) => {
  const displayEmail = adminEmail || email || "";
  const verifying = isVerifying || isLoading;
  const displaySuccess = successMessage || success;

  const canRetry = Boolean(
    canRetryRegistration ||
      canRetryCompletion ||
      hasVerificationToken ||
      (verificationToken && !success)
  );

  const handleRetry = onRetryRegistration || onRetryCompletion;


  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);


  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);


  const otpString = digits.join("");
  const isOtpComplete = otpString.length === 6 && digits.every((d) => d !== "");

  const handleDigitChange = (index: number, value: string) => {

    const numericChar = value.replace(/\D/g, "");
    const charToSet = numericChar.slice(-1);

    const newDigits = [...digits];
    newDigits[index] = charToSet;
    setDigits(newDigits);


    if (charToSet && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (digits[index]) {

        const newDigits = [...digits];
        newDigits[index] = "";
        setDigits(newDigits);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        setDigits(newDigits);
      }
      e.preventDefault();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const numericChars = pastedText.replace(/\D/g, "").slice(0, 6);

    if (!numericChars) return;

    const newDigits = [...digits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = numericChars[i] || "";
    }
    setDigits(newDigits);

    const nextEmptyIndex = newDigits.findIndex((d) => d === "");
    const focusTarget = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusTarget]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canRetry) {
      if (handleRetry && !isCompleting) {
        handleRetry();
      }
      return;
    }
    if (isOtpComplete && !verifying && !isResending && !isCompleting) {
      onVerify(otpString);
    }
  };

  const handleResendClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isResending && !verifying && !isCompleting && !canRetry) {
      onResend();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with icon and instructions */}
      <div className="text-center space-y-2 mb-2">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-[#635BFF] mb-1">
          <Mail className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
          {description ? (
            description
          ) : (
            <>
              Please check your email{" "}
              {displayEmail && (
                <span className="font-semibold text-slate-800 break-all">
                  ({displayEmail})
                </span>
              )}{" "}
              for a 6-digit verification code. Enter the code below to continue.
            </>
          )}
        </p>
      </div>

      {/* Email Verified Notice when recovering from completion failure */}
      {canRetry && (
        <div className="bg-indigo-50 border border-indigo-100 p-3 text-xs text-indigo-800 flex items-start gap-2 rounded-lg">
          <CheckCircle2 className="w-4 h-4 text-[#635BFF] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold">Email verified.</span> Your email has already been verified. Click below to finish registration.
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 flex items-start gap-2 rounded-lg">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{error}</span>
        </div>
      )}

      {/* Success Alert */}
      {displaySuccess && (
        <div className="bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-700 flex items-start gap-2 rounded-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{displaySuccess}</span>
        </div>
      )}

      {/* OTP Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-center text-xs font-semibold text-slate-700 mb-3">
            Enter 6-digit verification code
          </label>
          <div className="flex justify-center items-center gap-2 sm:gap-2.5">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                autoComplete={index === 0 ? "one-time-code" : "off"}
                value={digit}
                disabled={verifying || isResending || isCompleting || canRetry}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onFocus={(e) => e.target.select()}
                className="w-10 h-12 sm:w-11 sm:h-12 text-center text-xl font-bold font-mono text-slate-900 rounded-lg border border-slate-200 focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400 transition-colors shadow-none"
                aria-label={`Digit ${index + 1} of 6`}
              />
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            {canRetry ? (
              <button
                type="button"
                onClick={handleRetry}
                disabled={isCompleting || isVerifying || isResending}
                className="w-full py-2.5 px-4 bg-[#635BFF] hover:bg-[#5448F7] active:bg-[#483ee6] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isCompleting ? (
                  <>
                    <LoaderCircle className="animate-spin" size={16} />
                    <span>Completing registration...</span>
                  </>
                ) : (
                  <span>Retry registration</span>
                )}
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isOtpComplete || verifying || isResending || isCompleting}
                className="w-full py-2.5 px-4 bg-[#635BFF] hover:bg-[#5448F7] active:bg-[#483ee6] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {verifying || isCompleting ? (
                  <>
                    <LoaderCircle className="animate-spin" size={16} />
                    <span>
                      {isCompleting ? "Completing registration..." : "Verifying..."}
                    </span>
                  </>
                ) : (
                  <span>Verify Code</span>
                )}
              </button>
            )}

            {onBack && (
              <button
                type="button"
                onClick={onBack}
                disabled={verifying || isResending || isCompleting}
                className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                Back
              </button>
            )}
          </div>

          {/* Resend Action */}
          <div className="text-center pt-1">
            <span className="text-xs text-slate-500">
              Didn't receive the code?{" "}
            </span>
            <button
              type="button"
              onClick={handleResendClick}
              disabled={isResending || verifying || isCompleting || canRetry}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#635BFF] hover:text-[#5448F7] disabled:text-slate-400 disabled:cursor-not-allowed hover:underline focus:outline-none cursor-pointer"
            >
              {isResending ? (
                <>
                  <LoaderCircle className="animate-spin" size={12} />
                  <span>Resending code...</span>
                </>
              ) : (
                <>
                  <RefreshCw size={12} />
                  <span>Resend code</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export const OtpVerification = OtpVerificationStep;
export default OtpVerificationStep;
