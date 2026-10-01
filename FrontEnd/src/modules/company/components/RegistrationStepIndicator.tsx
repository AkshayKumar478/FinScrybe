import { Check } from "lucide-react";

interface Props {
  currentStep: 1 | 2 | 3;
}

export const RegistrationStepIndicator = ({ currentStep }: Props) => {
  const steps = [
    { number: 1, label: "Company Info" },
    { number: 2, label: "Admin Details" },
    { number: 3, label: "Email Verification" },
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Background connecting track */}
        <div className="absolute left-8 right-8 top-4 -translate-y-1/2 h-[2px] bg-slate-200 z-0" />
        {/* Active progress connecting track */}
        <div
          className="absolute left-8 top-4 -translate-y-1/2 h-[2px] bg-[#635BFF] transition-all duration-300 z-0"
          style={{
            width:
              currentStep === 1
                ? "0%"
                : currentStep === 2
                ? "50%"
                : "calc(100% - 4rem)",
          }}
        />

        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;

          return (
            <div
              key={step.number}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                  isCompleted
                    ? "bg-[#635BFF] text-white shadow-sm"
                    : isActive
                    ? "bg-[#635BFF] text-white ring-4 ring-indigo-50 shadow-sm"
                    : "bg-white text-slate-400 border border-slate-200"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[2.5]" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`mt-2 text-[11px] sm:text-xs tracking-tight transition-colors text-center whitespace-nowrap ${
                  isActive
                    ? "font-semibold text-slate-900"
                    : isCompleted
                    ? "font-medium text-slate-700"
                    : "font-normal text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

