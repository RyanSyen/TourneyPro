import CustomButton from "@/components/ui/button/CustomButton";
import { Input } from "@/components/ui/input";
import { UploadIcon } from "@/icons/components";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import PlayerTable from "./table";
import usePlayerStore from "../../../usePlayersStore";
import { Player } from "@/models/player";

export default function Players({tournamentId}: {tournamentId: string}) {
  // const [players, setPlayers] = useState<
  //   { id: number; name: string; organization: string }[]
  // >([]);
  const [newPlayer, setNewPlayer] = useState({ name: "", organization: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { players, fetchPlayers, addPlayer } = usePlayerStore();
  
    useEffect(() => {
      fetchPlayers();
    }, [fetchPlayers]);

  const insertPlayer = () => {
    if (!newPlayer.name || !newPlayer.organization) {
      toast.error("Name and organization are required!");
      return;
    }

    const nPlayer: Player = {
      ...newPlayer,
      tournamentId: tournamentId
    }
    addPlayer(nPlayer);
    // setPlayers([...players, { ...newPlayer, id: Date.now() }]);
    setNewPlayer({ name: "", organization: "" });
    fetchPlayers();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target) return;
      const csvData = event.target.result;
      if (!csvData) return;
      // const rows = (csvData as string).split("\n").slice(1);
      // const newPlayers = rows
      //   .map((row) => {
      //     const [name, organization] = row.split(",");
      //     return {
      //       id: Date.now(),
      //       name: name?.trim(),
      //       organization: organization?.trim(),
      //     };
      //   })
      //   .filter((p) => p.name && p.organization);
      // setPlayers([...players, ...newPlayers]);
    };
    reader.readAsText(file);
  };

  console.log('players: ', players)

  return (
    <section
      className={`space-y-4 overflow-y-auto pr-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6`}
    >
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold">Add Players</h2>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".csv"
          onChange={handleFileUpload}
        />
        <CustomButton
          startIcon={<UploadIcon />}
          size="sm"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="bg-green-700! text-white!"
        >
          Upload CSV
        </CustomButton>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Player Name"
            value={newPlayer.name}
            onChange={(e) =>
              setNewPlayer({ ...newPlayer, name: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Club, Academy, School, State"
            value={newPlayer.organization}
            onChange={(e) =>
              setNewPlayer({ ...newPlayer, organization: e.target.value })
            }
          />
        </div>
        <div>
          <CustomButton size="sm" onClick={insertPlayer} className="float-end">
            Add Player
          </CustomButton>
        </div>
      </div>
      <PlayerTable players={players} />
    </section>
  );
}
