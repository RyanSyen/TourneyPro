"use client";

import { useState } from "react";
import CustomButton from "@/components/ui/button/CustomButton";
import { ArrowLeftIcon } from "@/icons/components";
import { redirect } from "next/navigation";
import { CheckCircleIcon } from "@/icons/components";
import TournamentDetailsForm, {
  IStepOneData,
} from "../shared/components/tournament-details-form";
import TournamentRules, { IStepTwoData } from "./tournament-rules";
import dayjs from "dayjs";
import TournamentEvents, { IStepThreeData } from "./tournament-events";
import TournamentPreview from "./tournament-preview";

// no data to fetch, so no need server component
const CreateTournament = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    step1: IStepOneData;
    step2: IStepTwoData;
    step3: IStepThreeData;
  }>({
    step1: {
      title: "",
      description: "",
      thumbnail: "",
      isPublic: true,
      type: [],
      location: "",
      registrationDate: {
        from: dayjs().toISOString(),
        to: dayjs().add(3, "days").toISOString(),
      },
      date: {
        from: dayjs().add(3, "days").toISOString(),
        to: dayjs().add(10, "days").toISOString(),
      },
    },
    step2: {
      matchSettings: {
        points: "21",
        changeOfEnds: "1",
        gracePeriod: "3",
        allowSpinServe: false,
        allowDeuce: true,
      },
      rules: "Standard badminton rules apply.",
    },
    step3: {
      events: [],
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleStepSubmit = (stepData: IStepOneData | IStepTwoData | IStepThreeData) => {
    console.log("Step Data:", stepData);
    setFormData((prev) => ({
      ...prev,
      [`step${currentStep}`]: stepData,
    }));
    nextStep();
  };

  const handleFinalSubmit = () => {
    console.log("Final Submission Data:", formData);
    // Add API call or submission logic here
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // redirect("/tournament/list");
      console.log("Tournament Created Successfully");
    }, 2000);
  };
  return (
    <div>
      {currentStep === 1 && (
        <div className="flex items-center mb-6">
          <CustomButton
            variant="outline"
            size="sm"
            startIcon={<ArrowLeftIcon className="h-4 w-4" />}
            onClick={() => redirect("/tournament/list")}
          >
            Back
          </CustomButton>
        </div>
      )}
      <div className="max-w-4xl mx-auto p-4">
        {/* stepper header */}
        <div className="mb-8">
          <ol className="flex justify-center items-center select-none w-full">
            {["Basic Details", "Format & Rules", "Divisions", "Review"].map(
              (step, index) => (
                <li
                  key={index}
                  className={`flex items-center ${
                    index < currentStep ? "text-indigo-600" : "text-gray-500"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                      index + 1 === currentStep
                        ? "border-indigo-600 text-indigo-600"
                        : index + 1 < currentStep
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-gray-300 text-gray-500"
                    } me-4`}
                  >
                    {index + 1 < currentStep ? (
                      <CheckCircleIcon className="w-4 h-4" />
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
                  {index < 3 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        index < currentStep - 1
                          ? "bg-indigo-600"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </li>
              )
            )}
          </ol>
        </div>
        {currentStep === 1 && (
          <TournamentDetailsForm
            isEdit={false}
            defaultValues={formData.step1}
            onSubmit={handleStepSubmit}
          />
        )}
        {currentStep === 2 && (
          <TournamentRules
            isEdit={false}
            defaultValues={formData.step2}
            onSubmit={handleStepSubmit}
            prevStep={prevStep}
          />
        )}
        {/* {currentStep === 3 && <TournamentEvents defaultValues={formData.step3} onSubmit={handleStepSubmit} prevStep={prevStep} />} */}
        {currentStep === 3 && (
          <TournamentEvents
            tournamentId=""
            defaultValues={formData.step3}
            onSubmit={handleStepSubmit}
            prevStep={prevStep}
          />
        )}
        {currentStep === 4 && (
          <TournamentPreview
            step1={formData.step1}
            step2={formData.step2}
            step3={formData.step3}
            handleFinalSubmit={handleFinalSubmit}
            prevStep={prevStep}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default CreateTournament;
