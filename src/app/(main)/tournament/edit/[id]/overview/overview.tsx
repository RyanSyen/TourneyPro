import CustomButton from "@/components/ui/button/CustomButton";
import { UploadIcon } from "@/icons/components";
import { ITournamentDetails } from "@/types/tournament";
import Image from "next/image";
import React from "react";
import useTournamentStore from "../../../shared/data-store/useTournamentStore";
import useTournamentEventStore from "../../../shared/data-store/useEventStore";
import { toast } from "sonner";
import CreateTournamentForm from "../../../create/form";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { tournamentStatusLookup } from "@/lookups/tournament/statusLookup";
// import { useRouter } from "next/navigation";

export default function Overview({
  tournament,
  username,
}: {
  tournament: ITournamentDetails;
  username: string;
}) {
  const { publishTournament } = useTournamentStore();
  const { fetchTournamentEvents } = useTournamentEventStore();
  // const router = useRouter();

  const updateStatus = async () => {
    const res = await fetchTournamentEvents(tournament.id!);

    if (res && res.length == 0) {
      toast.warning("Please create an event before publishing the tournament.");
      return;
    }

    await publishTournament(tournament.id!);
    // router.refresh();
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
            <p className="leading-7">{username}</p>
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
                onClick={() => updateStatus()}
                hidden={tournament.status != 0}
                className="w-fit"
              >
                Publish
              </CustomButton>
            </p>
          </div>
        </section>
        <div className="flex-2">
          <CreateTournamentForm isEdit={true} tournament={tournament} />
        </div>
      </div>
    </div>
  );
}
