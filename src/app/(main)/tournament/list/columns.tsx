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
import { ArrowUpDownIcon, MoreHorizontalIcon } from "@/icons/components";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { TournamentSchema } from "@/models/tournament";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

// import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

type Tournament = z.infer<typeof TournamentSchema>;

export const columns: ColumnDef<Tournament>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const tournament = row.original;
      console.log("tournament row: ", tournament);

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
                navigator.clipboard.writeText(`/tournament/public/${tournament.id}`)
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
            <DropdownMenuItem>Edit tournament</DropdownMenuItem>
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
      const date = dayjs(tournament.date?.from).format("DD/MM/YYYY");
      return <div>{date}</div>;
    },
  },
  {
    accessorKey: "date.to",
    header: "End Date",
    cell: ({ row }) => {
      const tournament = row.original;
      const date = dayjs(tournament.date?.to).format("DD/MM/YYYY");
      return <div>{date}</div>;
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"));
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount);

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
];
