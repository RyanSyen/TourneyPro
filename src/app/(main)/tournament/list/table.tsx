"use client";

import { useEffect } from "react";
import useTournamentStore from "../useTournamentStore";
import { columns } from "./columns";
import { DataTable } from "./data-table";

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     {
//       id: "489e1d42",
//       amount: 125,
//       status: "processing",
//       email: "example@gmail.com",
//     },
//   ];
// }

const TournamentListTable = () => {
  const { tournaments, fetchTournaments, addTournament, deleteTournament } =
    useTournamentStore();

  // const data = await getData();
  // const data1 = fetchTournaments();
  useEffect(() => {
    fetchTournaments();
  }, []);

  console.log("tournaments: ", tournaments);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={tournaments} />
    </div>
  );
};

export default TournamentListTable;
