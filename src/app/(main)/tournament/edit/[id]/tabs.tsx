"use client";

import { useEffect, useState } from "react";
import {
  redirect,
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Matches from "./matchSettings/matches";
import useTournamentStore from "../../shared/data-store/useTournamentStore";
import Players from "./players/players";
import TournamentEvent from "./events/events";
import Overview from "./overview/overview";
import { ITournamentDetails } from "@/types/tournament";
import { Badge } from "@/components/ui/badge";
import { PencilIcon } from "@/icons/components";
import Rules from "./rules/rules";
import { Spinner } from "@/components/ui/spinner";

export default function EditTournamentTabs({ username }: { username: string }) {
  const { fetchTournament } = useTournamentStore();
  const params = useParams();
  const [tournament, setTournament] = useState<ITournamentDetails | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tabParam = searchParams.get("t") ?? "overview";
  const [tabValue, setTabValue] = useState<string>(tabParam);

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

  // keep state in sync with query string if user lands on a link with ?t=
  useEffect(() => {
    setTabValue(tabParam);
  }, [tabParam]);

  const handleTabChange = async (nextTab: string) => {
    const newUrl = `${pathname}?t=${nextTab}`;
    router.push(newUrl);

    setTabValue(nextTab);
  };

  if (!params.id) {
    redirect("/not-found");
  }

  if (loading)
    return (
      <div className="flex justify-center items-center gap-3">
        <Spinner size="large" />
      </div>
    );

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
        <Tabs value={tabValue} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
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
              <Overview tournament={tournament} username={username} />
            </div>
          </TabsContent>
          <TabsContent value="rules">
            <div className="pt-4">
              <Rules tournament={tournament} />
            </div>
          </TabsContent>
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
      </div>
    </div>
  );
}
