"use client";

import { Column, ColumnDef, Row } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  MoreHorizontal,
  MoveDown,
  MoveUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DatatableColumnHeader } from "./dataTableColumnHeader";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

// here you will define the data to be displayed, how it will be formatted, sorted and filtered
export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <SortingAction column={column} />;
      //   return <DatatableColumnHeader column={column} title="Email" />;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div>Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MYR",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return <RowAction payment={payment} />;
    },
  },
];

interface RowActionProps {
  payment: Payment;
}

interface SortingActionProps {
  column: Column<Payment, unknown>;
}

const RowAction = ({ payment }: RowActionProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open Me</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(payment.id)}
        >
          Copy payment ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View customer</DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const SortingAction = ({ column }: SortingActionProps) => {
  const order = column.getIsSorted();
  console.log("sort order: ", column.getIsSorted());
  return (
    <Button
      variant={"ghost"}
      onClick={() => column.toggleSorting(order === "asc")}
    >
      Email
      {/* couldn't simplify code */}
      {/* {!order ? (
        <div className="ml-2 flex">
          <ArrowUp className="h-4 w-4" />
          <ArrowDown className="h-4 w-4 ml-[-3px]" />
        </div>
      ) : order == "asc" ? (
        <div className="ml-2 flex">
          <ArrowUp className="h-4 w-4" color="#fcfcfc" />
          <ArrowDown className="h-4 w-4 ml-[-3px]" />
        </div>
      ) : (
        <div className="ml-2 flex">
          <ArrowUp className="h-4 w-4" />
          <ArrowDown className="h-4 w-4 ml-[-3px]" color="#fcfcfc" />
        </div>
      )} */}
      <div className="ml-2 flex">
        <ArrowUp className={`h-4 w-4 ${order == "asc" && "text-[#fcfcfc]"}`} />
        <ArrowDown
          className={`h-4 w-4 ml-[-3px] ${order == "desc" && "text-[#fcfcfc]"}`}
        />
      </div>
    </Button>
  );
};
