import { getTournamentById } from "@/app/service/tournament/tournamentService";

import Overview from "./overview";

const TDOverview = async ({ params }: { params: { id: string } }) => {
  const tournament = await getTournamentById(params.id);

  return (
    <>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight pb-4">
        Overview
      </h3>
      <Overview tournamentData={tournament} />
    </>
  );
};

export default TDOverview;
