export interface ITournamentEvent {
  id: string;
  event: string;
  ageGroup: string;
  type: string;
  level: string;
  prize: string;
  registrationFee: number;
  tournamentId: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}
