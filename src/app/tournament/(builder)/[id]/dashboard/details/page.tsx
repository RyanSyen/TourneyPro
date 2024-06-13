import { getTournamentById } from "@/app/service/tournament/tournamentService";
import TournamentDetailsForm from "@/app/tournament/(builder)/create/detailsForm";

import Details from "./details";

const TDDetails = async ({ params }: { params: { id: string } }) => {
  const tournament = await getTournamentById(params.id);

  return (
    <div>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight pb-4">
        Tournament Details
      </h3>
      <Details tournamentData={tournament} />
    </div>
  );
};

export default TDDetails;
