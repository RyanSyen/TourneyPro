import React from "react";
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

interface props {
  isEdit?: boolean;
  defaultValues: IStepTwoData;
  onSubmit: (data: IStepTwoData) => void;
  prevStep: () => void;
}

export interface IStepTwoData {
  matchSettings: IMatchSettings;
  rules: ITournamentRule;
}

function TournamentRulesPage({ defaultValues, onSubmit, prevStep }: props) {
  const [stepTwoData, setStepTwoData] =
    React.useState<IStepTwoData>(defaultValues);

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

      setStepTwoData({
        matchSettings: matchSettingsData,
        rules: {description: tournamentRulesData.description},
      });

      onSubmit({
        matchSettings: matchSettingsData,
        rules: {description: tournamentRulesData.description},
      });
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
          className="w-24"
          onClick={prevStep}
        >
          Previous
        </Button>
        <Button type="button" variant="tailAdminPrimary" onClick={handleSave}>
          Continue
        </Button>
      </section>
    </>
  );
}

export default TournamentRulesPage;
