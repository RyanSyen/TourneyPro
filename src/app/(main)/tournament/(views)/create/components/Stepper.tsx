import { CheckCircleIcon } from "@/components/icons/components/CheckCircle";

interface StepperProps {
  currentStep: number;
  steps: string[];
}

const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="mb-8">
      <ol className="flex w-full select-none items-center justify-center">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`flex items-center ${
              index < currentStep ? "text-indigo-600" : "text-gray-500"
            }`}
          >
            <span
              className={`me-4 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                index + 1 === currentStep
                  ? "border-indigo-600 text-indigo-600"
                  : index + 1 < currentStep
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-gray-300 text-gray-500"
              }`}
            >
              {index + 1 < currentStep ? (
                <CheckCircleIcon className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </span>
            <span
              className={`${
                index + 1 === currentStep ? "font-medium" : ""
              } hidden sm:inline-flex`}
            >
              {step}
            </span>
            {index < steps.length - 1 && ( // Changed from 'index < 3' for reusability
              <div
                className={`mx-4 h-0.5 flex-1 ${
                  index < currentStep - 1 ? "bg-indigo-600" : "bg-gray-200"
                }`}
              ></div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Stepper;
