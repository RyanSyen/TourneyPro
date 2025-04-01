import CustomButton from "@/components/ui/button/CustomButton";
import { UploadIcon } from "@/icons/components";
import { tournamentStatusLookup } from "@/lookups/tournament/statusLookup";
import { Tournament } from "@/models/tournament";
import { ITournamentDetails } from "@/types/tournament";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import useTournamentStore from "../../../shared/data-store/useTournamentStore";

function overview({ tournament }: { tournament: ITournamentDetails }) {
  const { publishTournament } = useTournamentStore();

  const updateStatus = async () => {
    await publishTournament(tournament.id!);
    window.location.reload();
  }

  return (
    <div className="flex flex-col gap-4">
      <section
        className={`space-y-4 overflow-y-auto pr-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6`}
      >
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-4 w-full">
            <div>
              <label className="scroll-m-20 text-xl font-semibold tracking-tight">
                Tournament Title
              </label>
              <p className="leading-7">{tournament.title}</p>
            </div>
            <div>
              <label className="scroll-m-20 text-xl font-semibold tracking-tight">
                Description
              </label>
              <p className="leading-7">{tournament.description}</p>
            </div>
            <div>
              <label className="scroll-m-20 text-xl font-semibold tracking-tight">
                Venue
              </label>
              <p className="leading-7">{tournament.location}</p>
            </div>
            <div className="flex gap-4">
              <div>
                <label className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Start Date
                </label>
                <p className="leading-7">
                  {dayjs(tournament.date?.from).format("DD-MM-YYYY")}
                </p>
              </div>
              <div>
                <label className="scroll-m-20 text-xl font-semibold tracking-tight">
                  End Date
                </label>
                <p className="leading-7">
                  {dayjs(tournament.date?.to!).format("DD-MM-YYYY")}
                </p>
              </div>
            </div>
            <div>
              <label className="scroll-m-20 text-xl font-semibold tracking-tight">
                Status
              </label>
              <p className="leading-7">
                {
                  tournamentStatusLookup.find((x) => x.id == tournament.status)
                    ?.title
                }
              </p>
            </div>
          </div>
          <div className="relative w-[650px] h-[250px]">
            <Image
              src={tournament.thumbnail}
              alt={tournament.title}
              fill
              sizes="100vw"
              className="object-cover object-center rounded-md"
            />
          </div>
        </div>
      </section>
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
