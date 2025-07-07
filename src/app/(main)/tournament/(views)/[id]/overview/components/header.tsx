"use client";

import { PlusIcon } from "@/components/icons/components/Plus";
import CustomButton from "@/components/ui/button/CustomButton";
import { redirect } from "next/navigation";

const TournamentListHeader = () => {
  const handleCreateTournament = () => {
    redirect("/tournament/create");
  };

  return (
    <div className="flex justify-start items-center gap-3">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
        Tournaments
      </h2>
      <CustomButton
        startIcon={<PlusIcon />}
        size="sm"
        onClick={handleCreateTournament}
      >
        Create Tournament
      </CustomButton>
    </div>
  );
};

export default TournamentListHeader;
