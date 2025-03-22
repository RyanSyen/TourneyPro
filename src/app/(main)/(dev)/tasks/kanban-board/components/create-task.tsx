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
import { PlusIcon } from "@/icons/components";
import CreateIssueForm from "./create-task-form";
import { Button } from "@/components/ui/button";

export default function CreateTaskModal() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="tailAdminPrimary" size="lg" className="gap-0!">
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl bg-white  dark:bg-gray-900 max-w-[700px] p-5 lg:p-10 m-4">
        <DialogHeader>
          <DialogTitle>Create Issue</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new issue.
          </DialogDescription>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <CreateIssueForm setOpenDialog={setOpenDialog} />
      </DialogContent>
    </Dialog>
  );
}
