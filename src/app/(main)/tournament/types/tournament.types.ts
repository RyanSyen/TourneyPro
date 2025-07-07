// Use this for stable domain types. Avoid form-specific or API-only structures here.
// Domain model: Tournament

export type TournamentType = "circuit" | "standalone";

export interface ITournament {
  id?: number;
  title: string;
  description: string;
  rules?: string;
  thumbnail: string;
  isPublic: boolean;
  type: TournamentType[];
  registrationStartDate: string;
  registrationEndDate: string;
  tournamentStartDate: string;
  tournamentEndDate: string;
  location: string;
  organizer?: string;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;

  tournamentRule?: ITournamentRule;
  matchSettings?: IMatchSettings;
  events?: ITournamentEvent[];
}

export interface ITournamentRule {
  id?: number;
  description: string;
  tournamentId?: number;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
  isDeleted?: boolean;
}

export interface IMatchSettings {
  points: string;
  changeOfEnds: string;
  gracePeriod: string;
  allowSpinServe: boolean;
  allowDeuce: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITournamentEvent {
  id?: number;
  tournamentId?: number;
  event: string;
  ageGroup: string;
  type: string;
  level: string;
  prize?: string;
  registrationFee?: number;
  players?: IPlayer[];
  // Auditing
  createdAt?: Date;
  createdById?: string | null;
  createdBy?: string | null;
  updatedAt?: Date | null;
  updatedById?: string | null;
  updatedBy?: string | null;
  deletedAt?: Date | null;
  deletedById?: string | null;
  deletedBy?: string | null;
  isDeleted?: boolean;
}

export interface IPlayer {
  id: string;
  tournamentId: string;
  name: string;
  organization: string;
  createdAt: Date;
  updatedAt: Date;
}
