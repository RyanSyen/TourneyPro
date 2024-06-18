"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { useAuthContext } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export const generateNavlist = (id: string) => {
  return [
    {
      title: "Overview",
      link: `/tournament/${id}/dashboard/overview`,
    },
    {
      title: "Details",
      link: `/tournament/${id}/dashboard/details`,
    },
    {
      title: "Match",
      link: `/tournament/${id}/dashboard/match`,
    },
    {
      title: "Category",
      link: `/tournament/${id}/dashboard/category`,
    },
    {
      title: "Registration",
      link: `/tournament/${id}/dashboard/registration`,
    },
    {
      title: "Players",
      link: `/tournament/${id}/dashboard/players`,
    },
    {
      title: "Schedule",
      link: `/tournament/${id}/dashboard/schedule`,
    },
    {
      title: "Draw",
      link: `/tournament/${id}/dashboard/draw`,
    },
  ];
};

interface props extends React.HTMLAttributes<HTMLElement> {
  id: string;
}

const TournamentDashboardNavbar = ({ className, id, ...props }: props) => {
  const navbarList = generateNavlist(id);
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

export default TournamentDashboardNavbar;
