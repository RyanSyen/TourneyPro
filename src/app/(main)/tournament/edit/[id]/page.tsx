import { fetchTournamentById } from "@/services/tournament-service";
import EditTournamentTabs from "./tabs";
import { notFound, redirect } from "next/navigation";

type Params = Promise<{ id: string }>;

const EditTournamentPage = async (props: { params: Params }) => {
  const params = await props.params;
  const tournamentId = params.id;
  const tournament = await fetchTournamentById(Number(tournamentId));

  if (!tournament) {
    return notFound();
  }

  return <EditTournamentTabs tournament={tournament} />;
};

export default EditTournamentPage;
