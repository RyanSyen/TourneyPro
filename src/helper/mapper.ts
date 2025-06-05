import dayjs from "dayjs";
import { APP_CONFIG } from "@/app/appconfig";
import { ITournamentDetails } from "@/types/tournament";
import { Prisma, Tournament } from "@prisma/client";

type TournamentWithRelations = Prisma.TournamentGetPayload<{
  include: {
    rules: true;
    events: true;
  };
}>;
export function mapTournamentToDetails(
  t: TournamentWithRelations
): ITournamentDetails {
  return {
    id: t.id,
    title: t.title,
    description: t.description,
    rules: t.rules?.description,
    thumbnail: t.thumbnail,
    isPublic: t.isPublic,
    type: t.type,
    registrationDate: {
      from: dayjs(t.registrationStart).format(APP_CONFIG.DATEFORMAT1),
      to: dayjs(t.registrationEnd).format(APP_CONFIG.DATEFORMAT1),
    },
    date: {
      from: dayjs(t.tournamentStart).format(APP_CONFIG.DATEFORMAT1),
      to: dayjs(t.tournamentEnd).format(APP_CONFIG.DATEFORMAT1),
    },
    location: t.location,
    organizer: t.createdById!,
    status: t.status,
    createdAt: dayjs(t.createdAt).format(APP_CONFIG.DATETIMEFORMAT2),
    updatedAt: dayjs(t.updatedAt).format(APP_CONFIG.DATETIMEFORMAT2),
    createdBy: t.createdById!,
    updatedBy: t.updatedById!,
  };
}
