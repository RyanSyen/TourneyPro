import CustomButton from "@/components/ui/button/CustomButton";
import { UploadIcon } from "@/icons/components";
import { ITournamentDetails } from "@/types/tournament";
import Image from "next/image";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { tournamentStatusLookup } from "@/lookups/tournament/statusLookup";
import { createAuthClient } from "better-auth/react";
import TournamentDetailsForm from "../../../shared/components/tournament-details-form";
import { useState } from "react";
import { Tournament } from "@/form_schema/tournament";
import dayjs from "dayjs";

interface props {
  tournament: ITournamentDetails;
}

const { useSession } = createAuthClient();

export default function Overview({ tournament }: props) {
  // console.log("tournament:", tournament);

  // prepare default values for the tournament details form
  const defaultValues: Tournament = {
    ...tournament,
    registrationDate: {
      from: dayjs(tournament.registrationDate.from).toISOString(),
      to: dayjs(tournament.registrationDate.to).toISOString(),
    },
    date: {
      from: dayjs(tournament.date.from).toISOString(),
      to: dayjs(tournament.date.to).toISOString(),
    },
  }
  const { data: session, isPending, error, refetch } = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);


  const onUpdateTournament = async (updatedTournament: Tournament) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/tournaments/" + tournament.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTournament),
      });
      console.log("Response:", response);
      if (!response.ok) throw new Error("Failed to update tournament");
      toast.success("Tournament updated successfully!");
      // router.push("/tournament/list");
    } catch (error) {
      toast.error("Failed to update tournament: " + error);
    } finally {
      setIsSubmitting(false);
    }
  }

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
            isEdit={false}
            defaultValues={defaultValues}
            onSubmit={onUpdateTournament}
          />
        </div>
      </div>
    </div>
  );
}
