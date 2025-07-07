"use client"

import { ArrowLeftIcon } from "@/components/icons/components/ArrowLeft";
import { PencilIcon } from "@/components/icons/components/Pencil";
import { Badge } from "@/components/ui/badge";
import CustomButton from "@/components/ui/button/CustomButton";
import { useRouter } from "next/navigation";
import React from "react";

function TournamentTabHeader({ tournamentTitle }: { tournamentTitle: string }) {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center mb-6">
        <CustomButton
          variant="outline"
          size="sm"
          startIcon={<ArrowLeftIcon className="h-4 w-4" />}
          onClick={() => router.push("/tournament/list")}
        >
          Back
        </CustomButton>
      </div>
      <div className="py-4 flex justify-between items-center">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {tournamentTitle}
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
    </div>
  );
}

export default TournamentTabHeader;
