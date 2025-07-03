import React from "react";
import TournamentRules, {
  ITournamentRules,
} from "../../create/tournament-rules";
import { IMatchSettings } from "@/types/matchSetting";

interface props {
  tournamentRules: string;
  matchSettings: IMatchSettings;
}

export default function Rules({ tournamentRules, matchSettings }: props) {
  const tournamentRulesData: ITournamentRules = {
    matchSettings: matchSettings,
    rules: {
      description: tournamentRules,
    },
  };
  return (
    <div>
      <TournamentRules isEdit={true} defaultValues={tournamentRulesData} />
    </div>
  );
}
