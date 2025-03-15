"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";

export const generateNavlist = ({ tournamentId, mode }: { tournamentId: string; mode: string }) => {
  return [
    {
      title: "Overview",
      link: `/tournament/${mode}/${tournamentId}/overview`,
    },
    {
      title: "Matches",
      link: `/tournament/${mode}/${tournamentId}/matches`,
    },
    {
      title: "Players",
      link: `/tournament/${mode}/${tournamentId}/players`,
    },
    {
      title: "Draws",
      link: `/tournament/${mode}/${tournamentId}/draws`,
    },
    {
      title: "Events",
      link: `/tournament/${mode}/${tournamentId}/events`,
    },
    {
      title: "Seeded Entries",
      link: `/tournament/${mode}/${tournamentId}/seededEntries`,
    },
    {
      title: "Winners",
      link: `/tournament/${mode}/${tournamentId}/winners`,
    },
  ];
};

interface props extends React.HTMLAttributes<HTMLElement> {
  tournamentId: string;
  mode: string;
}

const TournamentMainNavbar = ({ className, tournamentId, mode, ...props }: props) => {
  const navbarList = generateNavlist({ tournamentId, mode });
  const path = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {navbarList.map((nav) => {
        const uuid = uuidv4();
        return (
          <Link
            key={uuid}
            href={nav.link}
            className={`${
              nav.link === path
                ? "text-[#fcfcfc] font-semibold"
                : "text-[#8c94a1]"
            } hover:text-[#fcfcfc]`}
          >
            {nav.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default TournamentMainNavbar;
