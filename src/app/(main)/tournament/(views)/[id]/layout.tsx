import TournamentTabHeader from "./headers";
import { notFound } from "next/navigation";
import TournamentTabs from "./tabs";
import { fetchTournamentById } from "../../services/tournament.service";

type props = {
  children: React.ReactNode;
  params: { id: string };
};

export default async function TournamentTabLayout({ children, params }: props) {
  const { id } = await params;

  if (!id) {
    console.error("TournamentTabLayout - tournament id not found");
    return notFound();
  }

  const tournament = await fetchTournamentById(Number(id));

  if (!tournament) {
    console.error("TournamentTabLayout - tournament not found");
    return notFound();
  }

  return (
    <div>
      <TournamentTabHeader tournamentTitle={tournament.title} />
      <TournamentTabs tournament={tournament} />
      {children}
    </div>
  );
}
