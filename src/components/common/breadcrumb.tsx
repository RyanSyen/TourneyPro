"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import CustomLink from "../ui/link";

interface Props {
  breadcrumbList: IBreadcrumb[];
}

interface IBreadcrumb {
  segment: string;
  label: string;
  url?: string;
}

// const TournamentBreadcrumbList: ITournamentBreadcrumb[] = [
//   {
//     segment: "tournament",
//     label: "Tournament Builder",
//     url: "/tournament/list",
//   },
//   {
//     segment: "create",
//     label: "Create Tournament",
//   },
//   {
//     segment: "dashboard",
//     label: "Dashboard",
//   },
// ];

const BetaBreadcrumb = (list: Props) => {
  const path = usePathname();

  const pathWithoutQuery = path.split("?")[0];
  const breadcrumbs = list.breadcrumbList
    .filter((b) => {
      return pathWithoutQuery.split("/").includes(b.segment);
    })
    .map((obj) => {
      return { label: obj.label, url: obj?.url };
    });
  const breadcrumbLinks = [...breadcrumbs];

  return (
    <nav aria-label="breadcrumb" className="flex items-center pb-4">
      {breadcrumbLinks.map((breadcrumb, index) => {
        const isLastLink = index === breadcrumbLinks.length - 1;

        return (
          <div key={index} className="flex items-center">
            <CustomLink
              key={breadcrumb.label}
              variant={!breadcrumb.url ? null : "breadcrumb"}
              href={breadcrumb.url || ""}
              name={breadcrumb.label}
            />
            {!isLastLink && (
              <span className="px-1 text-[#8c94a1] pb-[2px]">{">"}</span>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export { BetaBreadcrumb, type IBreadcrumb };
