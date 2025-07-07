"use client";

import { useParams } from "next/navigation";
import React, { useMemo } from "react";
import { useTournamentRules } from "./hooks/useTournamentRules";
import TournamentRulesAndMatchSettingsWrapper from "../../../components/TournamentRulesAndMatchSettingsWrapper";
import GlobalLoader from "@/components/common/GlobalLoader";
import GlobalErrorDialog from "@/components/common/GlobalErrorDialog";

function Rules() {
  const params = useParams();
  const tournamentId = useMemo(() => Number(params.id), [params.id]);
  const res = useTournamentRules(tournamentId);
  const rules = res.data;
    console.log('tournament rules: ', rules)

  if (res.isPending) return <GlobalLoader />;
  if (res.error) return <GlobalErrorDialog error={Error(res.error.message)} />;
  if (!rules) return null;

  return (
    <div className="pt-4">
      <TournamentRulesAndMatchSettingsWrapper
        isEdit={true}
        defaultValues={rules}
      />
    </div>
  );
}

export default Rules;
