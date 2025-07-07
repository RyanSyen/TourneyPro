"use client";

import React, { useEffect, useMemo } from "react";
import { createAuthClient } from "better-auth/react";
import dayjs from "dayjs";
import CustomButton from "@/components/ui/button/CustomButton";
import { UploadIcon } from "@/components/icons/components/Upload";
import { tournamentStatusLookup } from "@/lookups/tournament/statusLookup";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import GlobalLoader from "@/components/common/GlobalLoader";
import GlobalErrorDialog from "@/components/common/GlobalErrorDialog";
import { notFound, useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { updateTournament } from "@/repository/tournament/mutation";
import { useTournament, useUpdateTournament } from "../../../hooks/useTournament";
import { TournamentFormValues } from "../../../types/tournament.form";
import TournamentDetailsForm from "../../../components/TournamentDetailsForm";

const { useSession } = createAuthClient();

function OverviewPage() {
  const params = useParams();
  const tournamentId = useMemo(() => Number(params.id), [params.id]);
  // console.log('tournament id: ', tournamentId)
  const res = useTournament(tournamentId);
  const tournament = res.data;
  const updateTournament = useUpdateTournament();

  // console.log('tournament: ', tournament?.title, tournament?.thumbnail)

  // useEffect(() => {
  //   console.log("res error:", res.error);
  //   console.log("res data:", res.data);
  //   console.log("res is loading:", res.isLoading);
  //   console.log("res status:", res.status);
  // }, [res.error, res.data, res.isLoading, res.status]);

  const { data: session, isPending, error, refetch } = useSession();

  const tournamentDefaultValues: TournamentFormValues | undefined =
    useMemo(() => {
      if (!tournament) return undefined;
      return {
        ...tournament,
        registrationStartDate: dayjs(
          tournament.registrationStartDate
        ).toISOString(),
        registrationEndDate: dayjs(
          tournament.registrationEndDate
        ).toISOString(),
        tournamentStartDate: dayjs(
          tournament.tournamentStartDate
        ).toISOString(),
        tournamentEndDate: dayjs(tournament.tournamentEndDate).toISOString(),
      };
    }, [tournament]);

  if (res.isPending || isPending) return <GlobalLoader />;
  if (error) return <GlobalErrorDialog error={Error(error.message)} />;
  if (res.error) return <GlobalErrorDialog error={Error(res.error.message)} />;
  if (!tournamentDefaultValues || !tournament) return null;

  const onUpdateTournament = (updatedTournament: TournamentFormValues) => {
    // console.log('updated tournament: ', updatedTournament)
    // console.log(
    //   "updateTournament queryId: ",
    //   tournament.id!,
    //   typeof tournament.id!
    // );

    updateTournament.mutate({
      id: tournament.id!,
      data: updatedTournament,
    });
  };

  return (
    <div className="flex flex-col gap-4 w-lvw-full pt-4">
      <div className="flex gap-4">
        <section
          className={`flex-1 space-y-4 overflow-y-auto h-fit pr-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6`}
        >
          <div className="relative w-[auto] h-[150px]">
            <Image
              src={tournament.thumbnail}
              alt={tournament.title}
              fill
              sizes="100vw"
              className="object-cover object-center rounded-md"
            />
          </div>
          <div>
            <p className="leading-7 text-md font-medium">{tournament.title}</p>
            <p className="leading-7">{session?.user.name}</p>
          </div>
          <Separator />
          <div>
            <p className="leading-7">Public Link:</p>
            <Link
              className="hover:text-blue-500 hover:underline leading-7 text-sm line-clamp-1"
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/tournament/edit/${tournament.id}`}
            >
              {`${process.env.NEXT_PUBLIC_BASE_URL}/tournament/edit/${tournament.id}`}
            </Link>
          </div>
          <Separator />
          <div>
            <p className="leading-7">Status:</p>
            <p className="leading-7 flex justify-between items-center">
              {
                tournamentStatusLookup.find((x) => x.id == tournament.status)
                  ?.title
              }
              <CustomButton
                startIcon={<UploadIcon />}
                size="sm"
                onClick={() => console.log("Publish Tournament")}
                hidden={tournament.status != 0}
                className="w-fit"
              >
                Publish
              </CustomButton>
            </p>
          </div>
        </section>
        <div className="flex-2">
          <TournamentDetailsForm
            isEdit={true}
            defaultValues={tournamentDefaultValues}
            onSubmit={onUpdateTournament}
          />
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
