"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ITournament } from "@/app/(main)/tournament/types/tournament.types";

interface props {
  tournament: ITournament;
}

export default function TournamentTabs({ tournament }: props) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const currentTab = segments[2] ?? ""; // "" represents Overview

  const [tabValue, setTabValue] = useState<string>(currentTab);

  useEffect(() => {
    setTabValue(currentTab);
  }, [currentTab]);

  if (!params?.id) {
    console.error("TournamentTabs - params id not found");
    return notFound();
  }

  const handleTabChange = (nextTab: string) => {
    const basePath = `/${segments.slice(0, 2).join("/")}`;
    const nextPath = nextTab === "" ? basePath : `${basePath}/${nextTab}`;
    router.push(nextPath);
  };

  return (
    <div>
      <Tabs value={tabValue} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger defaultChecked value="">
            Overview
          </TabsTrigger>
          <TabsTrigger value="rules">Rules</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="players" disabled={tournament.status != 1}>
            Players
          </TabsTrigger>
          <TabsTrigger value="seededEntries" disabled={tournament.status != 1}>
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
      </Tabs>
    </div>
  );
}
