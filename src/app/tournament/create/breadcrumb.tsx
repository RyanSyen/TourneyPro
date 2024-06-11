"use client";

import { usePathname } from "next/navigation";

import Breadcrumb from "@/components/common/breadcrumb";

const breadcrumbLinks = [
  {
    name: "Tournament List",
    url: "/tournament/list",
  },
  {
    name: "Create Tournament",
    url: "/tournament/create",
  },
];

const TournamentBreadcrumb = () => {
  const path = usePathname();
  const isDefaultPage = path.includes("list");

  if (isDefaultPage) return null;

  return <Breadcrumb links={breadcrumbLinks} />;
};

export default TournamentBreadcrumb;
