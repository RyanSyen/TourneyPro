"use client";

import { useEffect, useState } from "react";
import useTournamentStore from "../../useTournamentStore";
import { useParams } from "next/navigation";
import { Tournament } from "@/models/tournament";
import ViewTournamentHeader from "./header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PencilIcon } from "@/icons/components";
import CreateTournamentForm from "../../create/form";

const MainPage = () => {
  const { fetchTournament } = useTournamentStore();
  const params = useParams();
  const [tournament, setTournament] = useState<Tournament | undefined>(
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
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="draws">Draws</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="seededEntries">Seeded Entries</TabsTrigger>
            <TabsTrigger value="winners">Winners</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="pt-4">
              <CreateTournamentForm isEdit={true} tournament={tournament} />
            </div>
          </TabsContent>
          <TabsContent value="matches">Matches</TabsContent>
          <TabsContent value="players">Players</TabsContent>
          <TabsContent value="draws">Draws</TabsContent>
          <TabsContent value="events">Events</TabsContent>
          <TabsContent value="seededEntries">Seeded Entries</TabsContent>
          <TabsContent value="winners">Winners</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MainPage;
