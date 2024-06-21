import { getMatchSettingsByTournamentId } from "@/app/service/tournament/matchService";

import MatchSettings from "./match";

const MatchPage = async ({ params }: { params: { id: string } }) => {
  const res = await getMatchSettingsByTournamentId(params.id);
  return (
    <div>
      <MatchSettings matchSettings={res.message} tournamentId={params.id} />
    </div>
  );
};

export default MatchPage;
