"use client";

import { Button } from "@/components/ui/button";
import { SettingsIcon } from "@/icons/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useMatchSettingsStore from "../../../shared/data-store/useMatchSettingsStore";
import { useEffect, useState } from "react";
import { MatchSettings } from "@/form_schema/matchSetting";
import { Spinner } from "@/components/ui/spinner";

export default function Matches({ tournamentId }: { tournamentId: string }) {
  const { fetchMatchSettings } = useMatchSettingsStore();
  const [matchSettings, setMatchSettings] = useState<MatchSettings | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const loadMatchSettings = async () => {
      try {
        setLoading(true);
        const matchSettings = await fetchMatchSettings(tournamentId);
        console.log("matchSettings: ", matchSettings);
        setMatchSettings(matchSettings);
      } catch (error) {
        console.error("Error fetching matchSettings:", error);
        // Handle error state if needed
      } finally {
        setLoading(false);
      }
    };

    loadMatchSettings();
  }, [fetchMatchSettings, tournamentId]);

  if (loading)
    return (
      <div className="flex justify-center items-center gap-3">
        <Spinner size="large" />
      </div>
    );

  if (!matchSettings) return <div>Match Settings not found</div>;

  return (
    <section
      className={`space-y-4 overflow-y-auto pr-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6`}
    >
      <div className="flex justify-between">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Matches
        </h4>
        <div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button type="button" variant={"tailAdminSecondary"}>
                <SettingsIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl bg-white  dark:bg-gray-900  max-w-[700px] p-5 lg:p-10 m-4">
              <DialogHeader>
                <DialogTitle>Match Settings</DialogTitle>
              </DialogHeader>
              <DialogDescription></DialogDescription>
              {/* <MatchSettingsComponent tournamentId={tournamentId} matchSettings={matchSettings!} setOpenDialog={setOpenDialog} /> */}
              {/* <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="tailAdminSecondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter> */}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">No Matches Found.</p>
    </section>
  );
}
