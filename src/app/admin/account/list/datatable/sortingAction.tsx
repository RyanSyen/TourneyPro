import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Account } from "./columns";

interface SortingActionProps {
  column: Column<Account, unknown>;
  name: string;
}

const SortingAction = ({ column, name }: SortingActionProps) => {
  const order = column.getIsSorted();
  // console.log(`${name} column index: ${column.getIndex()}`);
  return (
    <Button
      variant={"ghost"}
      onClick={() => column.toggleSorting(order === "asc")}
      className="text-left p-0"
    >
      {name}
      <div className="ml-1 flex">
        <ArrowUp className={`h-4 w-4 ${order == "asc" && "text-[#fcfcfc]"}`} />
        <ArrowDown
          className={`h-4 w-4 ml-[-3px] ${order == "desc" && "text-[#fcfcfc]"}`}
        />
      </div>
    </Button>
  );
};

export default SortingAction;
