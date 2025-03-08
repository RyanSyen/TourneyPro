import { ReactNode } from "react";

export interface ITournamentStatusLookup {
  id: string;
  title: string;
  icon: string;
}

export const tournamentStatusLookup = [
  {
    id: 0,
    title: "Not Published",
    icon: "book-x",
  },
  {
    id: 1,
    title: "Open",
    icon: "book-check",
  },
  {
    id: 2,
    title: "Closed",
    icon: "ban",
  },
  {
    id: 3,
    title: "Live",
    icon: "crown",
  },
  {
    id: 4,
    title: "Ended",
    icon: "medal",
  },
];
