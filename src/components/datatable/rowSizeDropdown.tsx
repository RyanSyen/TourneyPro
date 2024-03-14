import { Table } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableColumnVisibilityProps<TData> {
  table: Table<TData>;
}

export function DatatableRowSizeDropdown<TData>({ table }: { table: any }) {
  return (
    <div className="flex items-center space-x-2 ">
      <p className="text-sm font-medium">Rows per page</p>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value: string) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className="h-8 w-[70px] outline-none !ring-transparent !focus:ring-shadow-none !focus-visible:border-slate-800 ">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default DatatableRowSizeDropdown;
