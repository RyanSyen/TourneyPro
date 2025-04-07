import CustomButton from "@/components/ui/button/CustomButton";
import { UploadIcon } from "@/icons/components";
import { tournamentStatusLookup } from "@/lookups/tournament/statusLookup";
import { Tournament } from "@/form_schema/tournament";
import { ITournamentDetails } from "@/types/tournament";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect } from "react";
import useTournamentStore from "../../../shared/data-store/useTournamentStore";
import { APP_CONFIG } from "@/app/appconfig";
import useTournamentEventStore from "../../../shared/data-store/useEventStore";
import { toast } from "sonner";
import CreateTournamentForm from "../../../create/form";

function overview({ tournament, username }: { tournament: ITournamentDetails, username: string }) {
  const { publishTournament } = useTournamentStore();
  const { fetchTournamentEvents } = useTournamentEventStore();

  const updateStatus = async () => {
    var res = await fetchTournamentEvents(tournament.id!);

    if (res && res.length == 0) {
      toast.warning("Please create an event before publishing the tournament.");
      return;
    }

    await publishTournament(tournament.id!);
    window.location.reload();
  };

//   useEffect(async () => {
//     var res = await fetch(process.env.NEXT_PUBLIC_CLERK_BE_API + "/users/" + tournament.createdBy, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
//       },
//     })
// }, []);

  return (
    <div className="flex flex-col gap-4 w-lvw-full">
      <div className="flex gap-4">
        <section
          className={`space-y-4 overflow-y-auto h-fit pr-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6`}
        >
          <div className="relative w-[300px] h-[150px]">
            <Image
              src={tournament.thumbnail}
              alt={tournament.title}
              fill
              sizes="100vw"
              className="object-cover object-center rounded-md"
            />
          </div>
          <div>
            <p className="leading-7">{tournament.title}</p>
            <p className="leading-7">{username}</p>
          </div>
        </section>
        <CreateTournamentForm isEdit={true} tournament={tournament} />
      </div>
      <CustomButton
        startIcon={<UploadIcon />}
        size="sm"
        onClick={() => updateStatus()}
        hidden={tournament.status != 0}
        className="w-fit"
      >
        Publish Tournament
      </CustomButton>
    </div>
  );
}

export default overview;
