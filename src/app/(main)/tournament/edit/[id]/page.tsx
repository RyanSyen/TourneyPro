"use client";

import { useEffect, useState } from "react";
// import useTournamentStore from "../../../useTournamentStore";
import { redirect, useParams } from "next/navigation";
import { Tournament } from "@/form_schema/tournament";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PencilIcon } from "@/icons/components";
import Matches from "./matchSettings/matches";
import useTournamentStore from "../../shared/data-store/useTournamentStore";
import CreateTournamentForm from "../../create/form";
import Players from "./players/players";
import TournamentEvent from "./events/events";
import Overview from "./overview/overview";
import { ITournamentDetails } from "@/types/tournament";

const MainPage = () => {
  const { fetchTournament } = useTournamentStore();
  const params = useParams();
  const [tournament, setTournament] = useState<ITournamentDetails | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTournament = async () => {
      try {
        setLoading(true);
        const tournamentData = await fetchTournament(params.id!.toString());
        console.log("tournament: ", tournamentData);
        setTournament(tournamentData);
      } catch (error) {
        console.error("Error fetching tournament:", error);
        // Handle error state if needed
      } finally {
        setLoading(false);
      }
    };

    loadTournament();
  }, [fetchTournament, params.id]);

  if (!params.id) {
    redirect("/not-found");
  }

  if (loading) return <div>Loading...</div>;

  if (!tournament) return <div>Tournament not found</div>;

  return (
    <div>
      <div className="py-4 flex justify-between items-center">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {tournament.title}
        </h2>
        <Badge
          variant="info"
          background={"light"}
          iconPosition={"left"}
          icon={<PencilIcon />}
          className="select-none"
        >
          Editor Mode
        </Badge>
      </div>
      <div>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="players" disabled={tournament.status != 1}>
              Players
            </TabsTrigger>
            <TabsTrigger
              value="seededEntries"
              disabled={tournament.status != 1}
            >
              Seeded Entries
            </TabsTrigger>
            <TabsTrigger value="draws" disabled={tournament.status != 1}>
              Draws
            </TabsTrigger>
            <TabsTrigger value="matches" disabled={tournament.status != 1}>
              Matches
            </TabsTrigger>
            <TabsTrigger value="winners" disabled={tournament.status != 4}>
              Winners
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="pt-4">
              <Overview tournament={tournament} />
            </div>
          </TabsContent>
          <TabsContent value="details">
            <div className="pt-4">
              <CreateTournamentForm isEdit={true} tournament={tournament} />
            </div>
          </TabsContent>
          <TabsContent value="rules">Rules</TabsContent>
          <TabsContent value="events">
            <div className="pt-4">
              <TournamentEvent tournamentId={params.id.toString()} />
            </div>
          </TabsContent>
          <TabsContent value="players">
            <div className="pt-4">
              <Players tournamentId={params.id.toString()} />
            </div>
          </TabsContent>
          <TabsContent value="seededEntries">Seeded Entries</TabsContent>
          <TabsContent value="draws">Draws</TabsContent>
          <TabsContent value="matches">
            <div className="pt-4">
              <Matches tournamentId={params.id.toString()} />
            </div>
          </TabsContent>
          <TabsContent value="winners">Winners</TabsContent>
        </Tabs>
        {/* <TournamentMainNavbar
          tournamentId={params.id!.toString()}
          mode="edit"
        /> */}
      </div>
    </div>
  );
};

export default MainPage;
