import type { UseFormReturn } from "react-hook-form";
import type { CompanyRegistrationInput } from "../types/companyRegistration.types";

interface Props {
  form: UseFormReturn<CompanyRegistrationInput>;
}

export const PrimaryAdminDetailsStep = ({ form }: Props) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Admin Full Name
        </label>
        <input
          {...register("adminFullName")}
          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10 transition-colors"
          placeholder="John Doe"
        />
        {errors.adminFullName && (
          <p className="mt-1 text-xs text-rose-600 font-medium">
            {errors.adminFullName.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Admin Email
        </label>
        <input
          type="email"
          {...register("adminEmail")}
          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10 transition-colors"
          placeholder="john.doe@acme.com"
        />
        {errors.adminEmail && (
          <p className="mt-1 text-xs text-rose-600 font-medium">
            {errors.adminEmail.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Admin Phone Number
        </label>
        <input
          type="tel"
          {...register("adminPhoneNumber")}
          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10 transition-colors"
          placeholder="0987654321"
        />
        {errors.adminPhoneNumber && (
          <p className="mt-1 text-xs text-rose-600 font-medium">
            {errors.adminPhoneNumber.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Admin Password
        </label>
        <input
          type="password"
          {...register("adminPassword")}
          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10 transition-colors"
          placeholder="********"
        />
        {errors.adminPassword && (
          <p className="mt-1 text-xs text-rose-600 font-medium">
            {errors.adminPassword.message}
          </p>
        )}
      </div>
    </div>
  );
};
