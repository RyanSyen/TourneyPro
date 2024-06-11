export interface ITournamentStatusLookup {
  id: string;
  title: string;
}

export const tournamentStatusLookup = [
  {
    id: 0,
    title: "Open",
  },
  {
    id: 1,
    title: "Closed",
  },
  {
    id: 2,
    title: "Live",
  },
  {
    id: 3,
    title: "Ended",
  },
];
