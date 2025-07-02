import React, { useState } from "react";
import TournamentRulesForm from "../shared/components/tournament-rules-form";
import MatchSettingsForm from "../shared/components/match-settings-form";
import {
  TournamentRules,
  TournamentRulesSchema,
} from "@/form_schema/tournamentRules";
import { Button } from "@/components/ui/button";
import { MatchSettings, MatchSettingsSchema } from "@/form_schema/matchSetting";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMatchSettings } from "@/types/matchSetting";
import { ITournamentRule } from "@/types/tournamentRule";
import { toast } from "sonner";
import { useParams } from "next/navigation";

interface props {
  isEdit?: boolean;
  defaultValues: IStepTwoData;
  onSubmit?: (data: IStepTwoData) => void;
  prevStep?: () => void;
}

export interface IStepTwoData {
  matchSettings: IMatchSettings;
  rules: ITournamentRule;
}

function TournamentRulesPage({
  isEdit,
  defaultValues,
  onSubmit,
  prevStep,
}: props) {
  const [stepTwoData, setStepTwoData] =
    React.useState<IStepTwoData>(defaultValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  const tournamentId = params.id?.toString();

  const matchSettingsForm = useForm<MatchSettings>({
    resolver: zodResolver(MatchSettingsSchema),
    shouldFocusError: false,
    defaultValues: stepTwoData.matchSettings,
  });

  const tournamentRulesForm = useForm<TournamentRules>({
    resolver: zodResolver(TournamentRulesSchema),
    shouldFocusError: false,
    defaultValues: stepTwoData.rules,
  });

  const handleSave = async () => {
    const isMatchSettingsValid = await matchSettingsForm.trigger();
    const isTournamentRulesValid = await tournamentRulesForm.trigger();

    if (isMatchSettingsValid && isTournamentRulesValid) {
      const matchSettingsData = matchSettingsForm.getValues();
      const tournamentRulesData = tournamentRulesForm.getValues();

      const stepTwoData = {
        matchSettings: matchSettingsData,
        rules: { description: tournamentRulesData.description },
      };

      setStepTwoData(stepTwoData);

      if (isEdit) {
        // call update api
        onUpdateRules(tournamentId!, stepTwoData);
      } else {
        if (onSubmit) {
          onSubmit({
            matchSettings: matchSettingsData,
            rules: { description: tournamentRulesData.description },
          });
        }
      }
    }
  };

  const onUpdateRules = async (tournamentId: string, rules: IStepTwoData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/tournament-rules/" + tournamentId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rules),
      });
      console.log("Response:", response);
      if (!response.ok) throw new Error("Failed to update tournament rules");
      toast.success("Tournament rules updated successfully!");
      // router.push("/tournament/list");
    } catch (error) {
      toast.error("Failed to update tournament rules: " + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <MatchSettingsForm
        form={matchSettingsForm}
        defaultValues={stepTwoData.matchSettings}
      />
      <div className="my-6" />
      <TournamentRulesForm
        form={tournamentRulesForm}
        defaultValues={stepTwoData.rules}
      />
      <section className="flex justify-end items-center gap-2 py-8">
        <Button
          type="button"
          variant={"tailAdminSecondary"}
          className={isEdit ? "hidden" : "w-24"}
          onClick={prevStep}
        >
          Previous
        </Button>
        <Button type="button" variant="tailAdminPrimary" onClick={handleSave}>
          {isEdit ? "Save" : "Continue"}
        </Button>
      </section>
    </>
  );
}

export default TournamentRulesPage;
