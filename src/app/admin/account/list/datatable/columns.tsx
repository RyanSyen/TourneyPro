"use client";

import { Column, ColumnDef } from "@tanstack/react-table";

import SortingAction from "./sortingAction";

export type Account = {
  fullName: string;
  emailAddress: string;
  mobileNumber: string;
  role: string;
  status: "active" | "inactive";
};

/**
    @link https://tanstack.com/table/v8/docs/api/core/column-def#accessorkey
    id: unique identifier for the column and used by the row object and functions
    accessorKey:  key of the row object when extracting value for column
    meta: used for identifying column text for display in Datatable Search Bar
    header: string | fn to render header value
 */

export const columns: ColumnDef<Account>[] = [
  {
    id: "fullName",
    accessorKey: "fullName",
    meta: "Full Name",
    header: ({ column }) => {
      return <SortingAction column={column} name="Full Name" />;
    },
  },
  {
    id: "emailAddress",
    accessorKey: "emailAddress",
    meta: "Email Address",
    header: ({ column }) => {
      return <SortingAction column={column} name="Email Address" />;
    },
  },
  {
    id: "mobileNumber",
    accessorKey: "mobileNumber",
    header: "Mobile Number",
    meta: "Mobile Number",
    cell: ({ row }) => {
      //   console.log("row: ", row);
      return <div className="font-medium">{row.getValue("mobileNumber")}</div>;
    },
  },
  {
    id: "role",
    accessorKey: "role",
    header: "Role",
    meta: "Role",
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    meta: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const isActive = status === "active";
      return (
        <div
          className={`font-medium ${
            isActive ? "text-[#00ff6c]" : "text-[#e50b0d]"
          }`}
        >
          {status}
        </div>
      );
    },
  },
];
