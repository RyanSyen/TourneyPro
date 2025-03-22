"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FilterIcon } from "@/icons/components";
import { Button } from "@/components/ui/button";

export default function FilterTaskModal() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="tailAdminSecondary" size="lg" className="gap-0!">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl bg-white  dark:bg-gray-900 max-w-[700px] p-5 lg:p-10 m-4">
        <DialogHeader>
          <DialogTitle>Filter Issues</DialogTitle>
          <DialogDescription>Feature under development.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
