export interface ITournamentDetails {
    id?: string;
    title: string;
    description: string;
    rules?: string;
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
  from: string;
  to: string;
}

export interface ICreateOrEditTournament {
  id?: string;
    title: string;
    description: string;
    rules?: string;
    thumbnail: string;
    isPublic: boolean;
    type: TournamentType[];
    registrationDate: DateRange;
    date: DateRange;
    location: string;
    organizer: string;
    status: number;

    // tournament event
    event: string;
    ageGroup: string;
    eventType: string;
    level: string;
    prize: string;
    registrationFee: number;

    // tournament match setting
    points: string;
    changeOfEnds: string;
    gracePeriod: string;
    allowSpinServe: boolean;
    allowDeuce: boolean;

    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}