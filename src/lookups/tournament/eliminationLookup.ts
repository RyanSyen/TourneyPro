export interface IEventTypeLookup {
  id: number;
  title: string;
}

export const EventTypeLookup: IEventTypeLookup[] = [
  {
    id: 0,
    title: "Elimination",
  },
  {
    id: 1,
    title: "Round Robin",
  },
];
