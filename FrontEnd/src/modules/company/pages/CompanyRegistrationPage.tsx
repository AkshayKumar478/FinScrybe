import { Link } from "react-router-dom";
import { useCompanyRegistration } from "../hooks/useCompanyRegistration";
import { CompanyDetailsStep } from "../components/CompanyDetailsStep";
import { PrimaryAdminDetailsStep } from "../components/PrimaryAdminDetailsStep";
import { RegistrationStepIndicator } from "../components/RegistrationStepIndicator";

export const CompanyRegistrationPage = () => {
  const {
    form,
    currentStep,
    isSubmitting,
    error,
    success,
    handleNextStep,
    handlePrevStep,
    onSubmit,
  } = useCompanyRegistration();

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Registration Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Your company has been registered successfully. Please login to continue.
            </p>
            <Link
              to="/login"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register your company
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegistrationStepIndicator currentStep={currentStep} />

          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            {currentStep === 1 && <CompanyDetailsStep form={form} />}
            {currentStep === 2 && <PrimaryAdminDetailsStep form={form} />}

            <div className="flex justify-between mt-6">
              {currentStep === 2 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep === 1 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400"
                >
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
