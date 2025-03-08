export interface ITournamentDetails {
    id?: string;
    title: string;
    description: string;
    thumbnail: string;
    isPublic: boolean;
    type: TournamentType[];
    startDate: string;
    endDate: string;
    location: string;
    organizer: string;
    status: number;
    createdAt: string;
    updatedAt: string;
  }

export type TournamentType = "circuit" | "standalone";