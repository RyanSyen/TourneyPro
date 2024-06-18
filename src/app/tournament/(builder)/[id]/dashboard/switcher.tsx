"use client";

import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { CommandEmpty } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  getAllTournaments,
  getAllTournamentsByOrganizer,
} from "@/app/service/tournament/tournamentService";
import CustomBounceLoader from "@/components/spinner/customBounceLoader";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuthContext } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

import { ITournamentDetails } from "../../create/detailsForm";

const TournamentDashboardSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [selectedTourney, setSelectedTourney] =
    useState<ITournamentDetails | null>(null);
  const context = useAuthContext();
  const [tournaments, setTournaments] = useState<ITournamentDetails[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchTournaments = async (id: string) => {
      setIsLoading(true);
      try {
        const data = await getAllTournamentsByOrganizer(id);

        console.log("data: ", data);
        setTournaments(data.message);
        setSelectedTourney(data.message[0]);
      } catch (error) {
        console.error("Error fetching tournamemts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (context?.user?.id) {
      fetchTournaments(context.user.id);
    }
  }, []);

  if (isLoading) return <CustomBounceLoader />;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"main"} className="rounded-md w-[250px] ">
          <div className="whitespace-nowrap overflow-hidden text-ellipsis block mr-4">
            {selectedTourney ? selectedTourney.title : ""}
          </div>

          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search tournament..." />
            <CommandEmpty>No tournament found.</CommandEmpty>
            <CommandGroup>
              {tournaments &&
                tournaments.map((t) => {
                  return (
                    <CommandItem
                      key={t.id}
                      onSelect={() => {
                        setSelectedTourney(t);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      {t.title}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedTourney?.id === t.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  router.push("/tournament/create");
                }}
              >
                <PlusCircledIcon className="mr-2 h-5 w-5" />
                Create Tournament
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TournamentDashboardSwitcher;
