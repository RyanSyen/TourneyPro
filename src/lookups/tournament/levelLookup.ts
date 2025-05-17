export interface ILevelLookup {
  id: number;
  title: string;
  desc: string;
}

export const LevelLookup: ILevelLookup[] = [
  {
    id: 0,
    title: "Professional",
    desc: "Players with State ID, BAM ID, or BWF ID",
  },
  {
    id: 1,
    title: "Amateurs",
    desc: "Players without State ID, BAM ID, or BWF ID",
  },
  {
    id: 2,
    title: "Open",
    desc: "Open for all skill levels",
  },
];
