export interface ITournamentTypeLookup {
  id: string;
  title: string;
  tooltip: string;
}

export const TournamentTypeLookup: ITournamentTypeLookup[] = [
  {
    id: "circuit",
    title: "Circuit",
    tooltip:
      "Consists of multiple tournaments held at different locations or times which are linked together by points system.",
  },
  {
    id: "standalone",
    title: "Standalone",
    tooltip:
      "Single event tournament without any points systems or qualifiers for other tournament events. ",
  },
];
