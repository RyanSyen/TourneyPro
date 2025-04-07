export interface ITournamentDetails {
    id?: string;
    title: string;
    description: string;
    thumbnail: string;
    isPublic: boolean;
    type: TournamentType[];
    registrationDate: DateRange;
    date: DateRange;
    location: string;
    organizer: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
  }

export type TournamentType = "circuit" | "standalone";

export interface DateRange {
  from: Date;
  to: Date;
}