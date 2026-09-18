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
        <label className="block text-sm font-medium text-gray-700">
          Admin Full Name
        </label>
        <input
          {...register("adminFullName")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          placeholder="John Doe"
        />
        {errors.adminFullName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.adminFullName.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Admin Email
        </label>
        <input
          type="email"
          {...register("adminEmail")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          placeholder="john.doe@acme.com"
        />
        {errors.adminEmail && (
          <p className="mt-1 text-sm text-red-600">
            {errors.adminEmail.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Admin Phone Number
        </label>
        <input
          type="tel"
          {...register("adminPhoneNumber")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          placeholder="0987654321"
        />
        {errors.adminPhoneNumber && (
          <p className="mt-1 text-sm text-red-600">
            {errors.adminPhoneNumber.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Admin Password
        </label>
        <input
          type="password"
          {...register("adminPassword")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          placeholder="********"
        />
        {errors.adminPassword && (
          <p className="mt-1 text-sm text-red-600">
            {errors.adminPassword.message}
          </p>
        )}
      </div>
    </div>
  );
};
