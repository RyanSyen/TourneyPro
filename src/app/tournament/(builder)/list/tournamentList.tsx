"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { getAllTournamentsByOrganizer } from "@/app/service/tournament/tournamentService";
import CustomContainer from "@/components/common/customContainer";
import TournamentCard from "@/components/common/tournamentCard";
import CustomBounceLoader from "@/components/spinner/customBounceLoader";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";

import { ITournamentDetails } from "../create/detailsForm";

interface prop {
  tournaments: ITournamentDetails[];
}

const TournamentCards = ({ tournaments }: prop) => {
  return (
    <div className="flex flex-wrap items-center gap-8 overflow-auto">
      {tournaments.map((t, index) => (
        <TournamentCard key={uuidv4()} tournament={t} />
      ))}
    </div>
  );
};

const TournamentList = () => {
  const router = useRouter();
  const context = useAuthContext();
  const [tournaments, setTournaments] = useState<ITournamentDetails[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTournaments = async (id: string) => {
      setIsLoading(true);
      try {
        const data = await getAllTournamentsByOrganizer(id);
        setTournaments(data.message);
      } catch (error) {
        console.error("Error fetching tournamemts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (context?.user?.id) {
      fetchTournaments(context.user.id);
    }
  }, []);

  if (isLoading) return <CustomBounceLoader />;

  return (
    <main>
      <div className="w-full h-full">
        <CustomContainer>
          <div className="flex items-center gap-4 pb-8">
            <h2 className="scroll-m-20 text-3xl text-center font-semibold tracking-tight first:mt-0">
              Tournament List
            </h2>
            <Button
              variant={"main"}
              onClick={() => router.push("/tournament/create")}
            >
              Create Tournament
            </Button>
          </div>
          <TournamentCards tournaments={tournaments || []} />
        </CustomContainer>
      </div>
    </main>
  );
};

export default TournamentList;
