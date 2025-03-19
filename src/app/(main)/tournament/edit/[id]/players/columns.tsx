import { Player } from "@/models/player";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon, MoreHorizontalIcon } from "@/icons/components";
import usePlayerStore from "../../../shared/data-store/usePlayersStore";


export const playerColumns: ColumnDef<Player>[] = [
    {
        id: "actions",
        cell: ({ row }) => {
          const player = row.original;
          const {deletePlayer} = usePlayerStore();
    
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    console.log('player id copied: ', player.id)
                  }
                >
                  Copy Player Url
                </DropdownMenuItem>
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem
                  onClick={() => deletePlayer(player.id!)}
                >
                  Delete Player
                </DropdownMenuItem>
                {/* <DropdownMenuItem
                  onClick={() => redirect(`/tournament/edit/${tournament.id}`)}
                >
                  Edit tournament
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Player Name
              <ArrowUpDownIcon className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "organization",
        header: "Organization",
      }
]