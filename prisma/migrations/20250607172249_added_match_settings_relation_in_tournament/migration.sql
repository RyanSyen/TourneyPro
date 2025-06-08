-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "matchSettingsId" INTEGER;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_matchSettingsId_fkey" FOREIGN KEY ("matchSettingsId") REFERENCES "MatchSettings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
