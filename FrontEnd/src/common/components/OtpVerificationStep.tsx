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
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 mb-1">
          <Mail className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 max-w-sm mx-auto">
          {description ? (
            description
          ) : (
            <>
              Please check your email{" "}
              {displayEmail && (
                <span className="font-semibold text-gray-900 break-all">
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
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-sm text-blue-700 flex items-start gap-2 rounded-r-md">
          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <div className="leading-5">
            <span className="font-semibold">Email verified.</span> Your email has already been verified. Click below to finish registration.
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 text-sm text-red-700 flex items-start gap-2 rounded-r-md">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <span className="leading-5">{error}</span>
        </div>
      )}

      {/* Success Alert */}
      {displaySuccess && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 text-sm text-green-700 flex items-start gap-2 rounded-r-md">
          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
          <span className="leading-5">{displaySuccess}</span>
        </div>
      )}

      {/* OTP Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-center text-sm font-medium text-gray-700 mb-3">
            Enter 6-digit verification code
          </label>
          <div className="flex justify-center items-center gap-2 sm:gap-3">
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
                className="w-11 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold font-mono text-gray-900 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
                aria-label={`Digit ${index + 1} of 6`}
              />
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                disabled={verifying || isResending || isCompleting}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {canRetry ? (
              <button
                type="button"
                onClick={handleRetry}
                disabled={isCompleting || isVerifying || isResending}
                className="inline-flex justify-center items-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors ml-auto"
              >
                {isCompleting ? (
                  <>
                    <LoaderCircle className="animate-spin -ml-1 mr-2 h-4 w-4" />
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
                className="inline-flex justify-center items-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors ml-auto"
              >
                {verifying || isCompleting ? (
                  <>
                    <LoaderCircle className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    <span>
                      {isCompleting ? "Completing registration..." : "Verifying..."}
                    </span>
                  </>
                ) : (
                  <span>Verify Code</span>
                )}
              </button>
            )}
          </div>

          {/* Resend Action */}
          <div className="text-center pt-2">
            <span className="text-sm text-gray-600">
              Didn't receive the code?{" "}
            </span>
            <button
              type="button"
              onClick={handleResendClick}
              disabled={isResending || verifying || isCompleting || canRetry}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500 disabled:text-indigo-400 disabled:cursor-not-allowed underline focus:outline-none"
            >
              {isResending ? (
                <>
                  <LoaderCircle className="animate-spin h-3.5 w-3.5" />
                  <span>Resending code...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="h-3.5 w-3.5" />
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
