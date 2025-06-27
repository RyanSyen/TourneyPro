import { columns } from "./columns";
import { DataTable } from "./datatable";
import { getAllTournaments } from "@/services/tournamentService";

const TournamentListTable = async () => {
  const tournaments = await getAllTournaments();

    // console.log("Tournament payload size (KB):", JSON.stringify(tournaments).length / 1024);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={tournaments} />
    </div>
  );
};

export default TournamentListTable;
