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

import { DataTablePagination } from "@/app/playground/payments-datatable/dataTablePagination";
import { DatatableSearchBar } from "@/app/playground/payments-datatable/dataTableSearchBar";
import { DatatableColumnVisibility } from "@/components/datatable/columnVisibility";
import DatatableRowSizeDropdown from "@/components/datatable/rowSizeDropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

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
      {/* <DatatableSearchBar table={table} /> */}
      {/* column visibility dropdown section */}
      <div className="flex justify-between pb-4">
        <DatatableColumnVisibility table={table} />
        <DatatableRowSizeDropdown table={table} />
      </div>

      {/* datatable section */}
      <div className="">
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
      <DataTablePagination table={table} showTotalSelected={false} />
    </div>
  );
}
