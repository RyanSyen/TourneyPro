"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

// --- Types ---


// --- Components ---
import { toast } from "sonner";
import CustomButton from "@/components/ui/button/CustomButton";
import { ArrowLeftIcon } from "@/components/icons/components/ArrowLeft";
import Stepper from "./components/Stepper";
import TournamentDetailsForm from "../../components/TournamentDetailsForm";
import TournamentRulesAndMatchSettingsForm, { ITournamentRules } from "../../components/TournamentRulesAndMatchSettingsWrapper";
import TournamentEventFormWrapper from "../../components/TournamentEventFormWrapper";
import TournamentPreview from "./components/TournamentPreview";
import { useCreateTournament } from "../../hooks/useTournament";
import { CreateOrUpdateTournamentDto } from "../../types/tournament.dto";
import { IMatchSettings, ITournament, ITournamentEvent, ITournamentRule } from "../../types/tournament.types";

const initialFormData = {
  step1: {
    title: "",
    description: "",
    thumbnail: "",
    isPublic: true,
    type: [],
    location: "",
    registrationStartDate: dayjs().toISOString(),
    registrationEndDate: dayjs().add(3, "days").toISOString(),
    tournamentStartDate: dayjs().add(3, "days").toISOString(),
    tournamentEndDate: dayjs().add(10, "days").toISOString(),
  } as ITournament, // Explicit casting for clarity
  step2: {
    matchSettings: {
      points: "21",
      changeOfEnds: "1",
      gracePeriod: "3",
      allowSpinServe: false,
      allowDeuce: true,
    } as IMatchSettings,
    rules: {
      description: "Standard badminton rules apply.",
    } as ITournamentRule,
  } as ITournamentRules,
  step3: [] as ITournamentEvent[],
};

function CreateTournamentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const router = useRouter();
  const createTournament = useCreateTournament();

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handlePrevStep = () => setCurrentStep((prev) => prev - 1);

  const handleStepSubmit = (
    stepData: ITournament | ITournamentRules | ITournamentEvent[]
  ) => {
    // console.log("Step Data:", stepData);
    setFormData((prev) => ({
      ...prev,
      [`step${currentStep}`]: stepData,
    }));
    handleNextStep();
  };

  const handleFinalSubmit = () => {
    const createTournamentInput: CreateOrUpdateTournamentDto = {
      ...formData,
    };

    createTournament.mutate(createTournamentInput);
    // console.log("Final Submission Data:", formData);
    // setIsSubmitting(true);

    // try {
    //   const response = await fetch("/api/tournaments", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData),
    //   });

    //   if (!response.ok) {
    //     const errorBody = await response.json();
    //     throw new Error(errorBody.error || "Failed to create tournament. Please try again.");
    //   }

    //   toast.success("Tournament created successfully! 🎉");
    //   router.push("/tournament/list");
    // } catch (error: any) { // Consider more specific error typing if possible
    //   toast.error("Error creating tournament: " + (error.message || "Unknown error occurred."));
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const steps = ["Basic Details", "Format & Rules", "Events", "Review"];

  return (
    <div>
      {currentStep === 1 && (
        <div className="flex items-center mb-6">
          <CustomButton
            variant="outline"
            size="sm"
            startIcon={<ArrowLeftIcon className="h-4 w-4" />}
            onClick={() => router.push("/tournament/list")}
          >
            Back
          </CustomButton>
        </div>
      )}
      <div className="mx-auto max-w-4xl p-4">
        <Stepper currentStep={currentStep} steps={steps} />
      </div>
      {currentStep === 1 && (
        <TournamentDetailsForm
          isEdit={false}
          defaultValues={formData.step1}
          onSubmit={handleStepSubmit}
        />
      )}
      {currentStep === 2 && (
        <TournamentRulesAndMatchSettingsForm
          isEdit={false}
          defaultValues={formData.step2}
          onSubmit={handleStepSubmit}
          prevStep={handlePrevStep}
        />
      )}
      {currentStep === 3 && (
        <TournamentEventFormWrapper
          tournamentId=""
          defaultValues={formData.step3}
          onSubmit={handleStepSubmit}
          prevStep={handlePrevStep}
        />
      )}
      {currentStep === 4 && (
        <TournamentPreview
          step1={formData.step1}
          step2={formData.step2}
          step3={formData.step3}
          handleFinalSubmit={handleFinalSubmit}
          prevStep={handlePrevStep}
          isSubmitting={createTournament.isPending}
        />
      )}
    </div>
  );
}

export default CreateTournamentPage;
