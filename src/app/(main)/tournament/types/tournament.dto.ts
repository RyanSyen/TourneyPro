// Use this for create/edit payloads, typically tied to UI forms or API bodies.
// API Dto: CreateTournamentDto, UpdateTournamentDto

import {
  ITournament,
  ITournamentEvent,
} from "@/app/(main)/tournament/types/tournament.types";
import { ITournamentRules } from "../components/TournamentRulesAndMatchSettingsWrapper";

export interface CreateOrUpdateTournamentDto {
  step1: ITournament;
  step2: ITournamentRules;
  step3: ITournamentEvent[];
}
