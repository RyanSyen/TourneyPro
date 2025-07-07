"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { redirect } from "next/navigation";
import { ITournament } from "@/app/(main)/tournament/types/tournament.types";
import { MoreHorizontalIcon } from "@/components/icons/components/MoreHorizontal";
import { ArrowUpDownIcon } from "@/components/icons/components/ArrowUpDown";

export const columns: ColumnDef<ITournament>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const tournament = row.original;
      // console.log("tournament row: ", tournament);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  `/tournament/public/${tournament.id}`
                )
              }
            >
              Copy Tournament Url
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => redirect(`/tournament/public/${tournament.id}`)}
            >
              View tournament
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => redirect(`/tournament/${tournament.id}`)}
            >
              Edit tournament
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "isPublic",
    header: "IsPublic",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "date.from",
    header: "Start Date",
    cell: ({ row }) => {
      const tournament = row.original;
      const date = dayjs(tournament.tournamentStartDate).format("DD/MM/YYYY");
      return <div>{date}</div>;
    },
  },
  {
    accessorKey: "date.to",
    header: "End Date",
    cell: ({ row }) => {
      const tournament = row.original;
      const date = dayjs(tournament.tournamentEndDate).format("DD/MM/YYYY");
      return <div>{date}</div>;
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
];
