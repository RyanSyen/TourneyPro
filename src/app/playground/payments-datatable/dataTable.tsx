"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DatatableColumnVisibility } from "./dataTableColumnVisibility";
import {
  DataTablePagination,
  DataTableSimplePagination,
} from "./dataTablePagination";
import { DatatableSearchBar } from "./dataTableSearchBar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

/**
 * @description This component renders a payment datatable example.
 * @summary Shadcn Tanstack Datatable features: cell formating, row actions, pagination, sorting, filtering, column visibility, row selection
 * @todo we can make this datatable reusable by extracting it to components/ui/data-table.tsx
 * @link https://ui.shadcn.com/docs/components/data-table
 *
 * @param {ColumnDef<TData, TValue>[]} columns The datatable columns.
 * @param {TData[]} data The datatable data.
 * @returns {ReactNode} Returns a TanStack React DataTable.
 */
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // return row model after pagination
    onSortingChange: setSorting, // called when state.sorting changes
    getSortedRowModel: getSortedRowModel(), // return sorted row model
    onColumnFiltersChange: setColumnFilters, // called when state.columnFilter changes
    getFilteredRowModel: getFilteredRowModel(), // return filtered row model
    onColumnVisibilityChange: setColumnVisibility, // called when state.columnVisibility changes
    onRowSelectionChange: setRowSelection, // called when state.rowSelection changes
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      {/* search bar section */}
      <DatatableSearchBar table={table} />
      {/* column visibility dropdown section */}
      <DatatableColumnVisibility table={table} />
      {/* datatable section */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* pagination footer section */}
      {/* <DataTableSimplePagination table={table} /> */}
      <DataTablePagination table={table} />
    </div>
  );
}
