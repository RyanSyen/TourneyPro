"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error("Server error:", error);
  }, [error]);

  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Something went wrong in Tournament Module</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="text-sm text-muted-foreground">
          {error.message || "An unexpected error occurred."}
        </div>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => router.push("/tournament/list")}
          >
            Go Back
          </Button>
          <Button onClick={reset}>Try Again</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
