"use client";

import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import CustomContainer from "@/components/common/customContainer";
import TournamentCard from "@/components/common/tournamentCard";
import { Button } from "@/components/ui/button";

import { ITournamentDetails } from "../create/detailsForm";

interface prop {
  tournaments: ITournamentDetails[];
}

const TournamentCards = ({ tournaments }: prop) => {
  const uuid = uuidv4();

  return (
    <div className="flex flex-wrap items-center gap-8 overflow-auto">
      {tournaments.map((t, index) => (
        <div key={uuid}>
          <TournamentCard tournament={t} />
        </div>
      ))}
    </div>
  );
};

const TournamentList = ({ tournaments }: prop) => {
  const router = useRouter();
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
          <TournamentCards tournaments={tournaments} />
        </CustomContainer>
      </div>
    </main>
  );
};

export default TournamentList;
