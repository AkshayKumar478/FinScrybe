interface Props {
  currentStep: 1 | 2;
}

export const RegistrationStepIndicator = ({ currentStep }: Props) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
          currentStep === 1
            ? "bg-indigo-600 text-white"
            : "bg-green-500 text-white"
        }`}
      >
        1
      </div>
      <div
        className={`h-1 w-16 ${
          currentStep === 2 ? "bg-green-500" : "bg-gray-200"
        }`}
      ></div>
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
          currentStep === 2
            ? "bg-indigo-600 text-white"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        2
      </div>
    </div>
  );
};
