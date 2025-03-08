export interface IRoleLookup {
  id: number;
  title: string;
  description: string;
  img: string;
}

export const RoleLookup: IRoleLookup[] = [
  {
    id: 0,
    title: "Viewer",
    description:
      "Viewers are able to view tournament details, access information about participants and view match results.",
    img: "../roles/viewer.svg",
  },
  {
    id: 1,
    title: "Player",
    description:
      "Players are able to register for tournaments, access their match schedules and view personal score and statistics.",
    img: "../roles/player.svg",
  },
  {
    id: 2,
    title: "Organizer",
    description:
      "Organizers are able to create and manage tournaments with our intuitive builder with no upfront costs.",
    img: "../roles/organizer.svg",
  },
];
