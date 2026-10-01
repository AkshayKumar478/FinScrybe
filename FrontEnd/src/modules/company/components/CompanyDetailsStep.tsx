import type { UseFormReturn } from "react-hook-form";
import type { CompanyRegistrationInput } from "../types/companyRegistration.types";

interface Props {
  form: UseFormReturn<CompanyRegistrationInput>;
}

export const CompanyDetailsStep = ({ form }: Props) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Company Name
        </label>
        <input
          {...register("companyName")}
          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10 transition-colors"
          placeholder="Acme Corp"
        />
        {errors.companyName && (
          <p className="mt-1 text-xs text-rose-600 font-medium">
            {errors.companyName.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Industry
        </label>
        <input
          {...register("industry")}
          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10 transition-colors"
          placeholder="Technology"
        />
        {errors.industry && (
          <p className="mt-1 text-xs text-rose-600 font-medium">
            {errors.industry.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Company Email
        </label>
        <input
          type="email"
          {...register("companyEmail")}
          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10 transition-colors"
          placeholder="contact@acme.com"
        />
        {errors.companyEmail && (
          <p className="mt-1 text-xs text-rose-600 font-medium">
            {errors.companyEmail.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Company Phone
        </label>
        <input
          type="tel"
          {...register("companyPhone")}
          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10 transition-colors"
          placeholder="1234567890"
        />
        {errors.companyPhone && (
          <p className="mt-1 text-xs text-rose-600 font-medium">
            {errors.companyPhone.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          GSTIN
        </label>
        <input
          {...register("gstin")}
          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 uppercase placeholder:text-slate-400 focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10 transition-colors"
          placeholder="22AAAAA0000A1Z5"
        />
        {errors.gstin && (
          <p className="mt-1 text-xs text-rose-600 font-medium">
            {errors.gstin.message}
          </p>
        )}
      </div>
    </div>
  );
};
