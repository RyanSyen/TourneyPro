"use client";

import Button from "@/components/ui/button/Button";
import { toast } from "sonner";

const TouurnamentList = () => {
  return (
    <div>
      TournamentList
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
            className: 'success',
            duration: 5000,
          })
        }
      >
        Show Toast
      </Button>
    </div>
  );
};

export default TouurnamentList;
