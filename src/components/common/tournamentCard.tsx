"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getUserById } from "@/app/service/user/userService";
import { ITournamentDetails } from "@/app/tournament/(builder)/create/detailsForm";
import { MAIN_DATE_FORMAT } from "@/helper/dateHelper";
import { UserData } from "@/types/UserData";

import { Skeleton } from "../ui/skeleton";

interface prop {
  tournament: ITournamentDetails;
}

const TournamentSkeleton = () => {
  return <Skeleton className="h-[270px] w-[250px] rounded-xl" />;
};

const TournamentCard = ({ tournament }: prop) => {
  const [organizer, setOrganizer] = useState<{
    message: any;
    success: boolean;
  } | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizer = async () => {
      setIsLoading(true);
      try {
        const organizerData = await getUserById(tournament.organizer);
        setOrganizer(organizerData);
      } catch (error) {
        console.error("Error fetching organizer:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrganizer();
  }, [tournament.organizer]);

  if (isLoading) {
    return <TournamentSkeleton />;
  } else {
    return (
      <div
        className="flex flex-col w-[250px] rounded-lg cursor-pointer relative bg-[#26282f] overflow-hidden border border-transparent hover:border-[#f8258f]"
        onClick={() =>
          router.push(`/tournament/${tournament.id}/dashboard/overview`)
        }
      >
        <section className="h-[150px] object-cover flex-center overflow-hidden ">
          <Image
            src={tournament.thumbnail}
            alt={`${tournament.title} thumbnail`}
            width={500}
            height={300}
          />
        </section>
        <section className="relative flex flex-col px-3 py-4">
          <div className="text-sm text-muted-foreground text-[#8c94a1] hover:text-[#f8258f]">
            {organizer?.message.fullName}
          </div>
          <div className="py-2">{tournament.title}</div>
          <div className="text-xs text-muted-foreground font-medium text-[#8c94a1] pt-2">
            {dayjs(tournament.startDate).format(MAIN_DATE_FORMAT)} -{" "}
            {dayjs(tournament.endDate).format(MAIN_DATE_FORMAT)}
          </div>
        </section>
        <section className="absolute flex top-0 w-full bg-gradient-to-b from-black to-[rgba(128,128,128,0)] bg-no-repeat">
          status
        </section>
      </div>
    );
  }
};

export default TournamentCard;
