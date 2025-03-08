export interface ILevelLookup {
  id: number;
  title: string;
  tooltip: string;
}

export const LevelLookup: ILevelLookup[] = [
  {
    id: 0,
    title: "Professional",
    tooltip: "Players with State ID, BAM ID, or BWF ID",
  },
  {
    id: 1,
    title: "Amateurs",
    tooltip: "Players without State ID, BAM ID, or BWF ID",
  },
  {
    id: 2,
    title: "Open",
    tooltip: "Open for all skill levels",
  },
];
