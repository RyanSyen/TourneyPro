import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

interface DataTableSearchBarProps<TData> {
  table: Table<TData>;
}

/**
 * @description This component renders a datatable search bar filter by email.
 * @summary can configure to column filtering, global filtering, fuzzy filtering, faceted filtering
 * @link https://tanstack.com/table/v8/docs/guide/filters
 */
export function DatatableSearchBar<TData>({
  table,
}: DataTableSearchBarProps<TData>) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filter emails..."
        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("email")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </div>
  );
}
