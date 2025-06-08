import { IPlayer } from "./player";

export interface ITournamentEvent {
  id: number;
  tournamentId: number;
  event: string;
  ageGroup: string;
  type: string;
  level: string;
  prize?: string | null;
  registrationFee?: number | null;
  players?: IPlayer[];
  // Auditing
  createdAt: Date;
  createdById?: string | null;
  createdBy?: string | null;
  updatedAt: Date | null;
  updatedById?: string | null;
  updatedBy?: string | null;
  deletedAt: Date | null;
  deletedById?: string | null;
  deletedBy?: string | null;
  isDeleted: boolean;
}
