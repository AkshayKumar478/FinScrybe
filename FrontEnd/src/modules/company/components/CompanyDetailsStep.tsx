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
        <label className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          {...register("companyName")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          placeholder="Acme Corp"
        />
        {errors.companyName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.companyName.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Industry
        </label>
        <input
          {...register("industry")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          placeholder="Technology"
        />
        {errors.industry && (
          <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Email
        </label>
        <input
          type="email"
          {...register("companyEmail")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          placeholder="contact@acme.com"
        />
        {errors.companyEmail && (
          <p className="mt-1 text-sm text-red-600">
            {errors.companyEmail.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Phone
        </label>
        <input
          type="tel"
          {...register("companyPhone")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          placeholder="1234567890"
        />
        {errors.companyPhone && (
          <p className="mt-1 text-sm text-red-600">
            {errors.companyPhone.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">GSTIN</label>
        <input
          {...register("gstin")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 uppercase"
          placeholder="22AAAAA0000A1Z5"
        />
        {errors.gstin && (
          <p className="mt-1 text-sm text-red-600">{errors.gstin.message}</p>
        )}
      </div>
    </div>
  );
};
