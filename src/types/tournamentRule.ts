export interface ITournamentRule {
  id: number;
  description: string;
  tournamentId: number;
  createdAt: Date;
  createdBy?: string;
  updatedAt: Date | null;
  updatedBy?: string;
  deletedAt: Date | null;
  deletedBy?: string;
  isDeleted: boolean;
}
