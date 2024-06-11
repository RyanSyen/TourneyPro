import { getAllTournaments } from "@/app/service/tournament/tournamentService";

import { ITournamentDetails } from "../create/detailsForm";
import TournamentList from "./tournamentList";

const TournamentListPage = async () => {
  const data = await getAllTournaments();

  if (data.success) {
    return (
      <div>
        <TournamentList tournaments={data.message} />
      </div>
    );
  }
};

export default TournamentListPage;
