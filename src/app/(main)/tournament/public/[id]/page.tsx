// "use client";

// import { useEffect, useState } from "react";
// // import useTournamentStore from "../../shared/data-store/useTournamentStore";
// import { useParams } from "next/navigation";
// import ViewTournamentHeader from "./header";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ITournamentDetails } from "@/types/tournament";
// import { Spinner } from "@/components/ui/spinner";

// const MainPage = () => {
//   // const { fetchTournament } = useTournamentStore();
//   const params = useParams();
//   const [tournament, setTournament] = useState<ITournamentDetails | undefined>(
//     undefined
//   );
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const loadTournament = async () => {
//       try {
//         setLoading(true);
//         const tournamentData = await fetchTournament(params.id!.toString());
//         console.log("tournament: ", tournamentData);
//         setTournament(tournamentData);
//       } catch (error) {
//         console.error("Error fetching tournament:", error);
//         // Handle error state if needed
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadTournament();
//   }, [fetchTournament, params.id]);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center gap-3">
//         <Spinner size="large" />
//       </div>
//     );

//   if (!tournament) return <div>Tournament not found</div>;

//   return (
//     <div>
//       {tournament.thumbnail && (
//         <ViewTournamentHeader
//           title={tournament.title}
//           imgUrl={tournament.thumbnail}
//         />
//       )}
//       <div className="pt-4">
//         <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
//           {tournament.title}
//         </h2>
//       </div>
//       <div>
//         <Tabs defaultValue="overview" className="w-[400px]">
//           <TabsList>
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="matches">Matches</TabsTrigger>
//             <TabsTrigger value="players">Players</TabsTrigger>
//             <TabsTrigger value="draws">Draws</TabsTrigger>
//             <TabsTrigger value="events">Events</TabsTrigger>
//             <TabsTrigger value="seededEntries">Seeded Entries</TabsTrigger>
//             <TabsTrigger value="winners">Winners</TabsTrigger>
//           </TabsList>
//           <TabsContent value="overview">Overview</TabsContent>
//           <TabsContent value="matches">Matches</TabsContent>
//           <TabsContent value="players">Players</TabsContent>
//           <TabsContent value="draws">Draws</TabsContent>
//           <TabsContent value="events">Events</TabsContent>
//           <TabsContent value="seededEntries">Seeded Entries</TabsContent>
//           <TabsContent value="winners">Winners</TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default MainPage;

import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page
