/*
  Warnings:

  - You are about to drop the column `matchSettingsId` on the `Tournament` table. All the data in the column will be lost.
  - You are about to drop the column `rulesId` on the `Tournament` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tournamentId]` on the table `MatchSettings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tournamentId]` on the table `TournamentRules` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Tournament" DROP CONSTRAINT "Tournament_matchSettingsId_fkey";

-- DropForeignKey
ALTER TABLE "Tournament" DROP CONSTRAINT "Tournament_rulesId_fkey";

-- DropIndex
DROP INDEX "Tournament_matchSettingsId_key";

-- DropIndex
DROP INDEX "Tournament_rulesId_key";

-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "matchSettingsId",
DROP COLUMN "rulesId";

-- CreateIndex
CREATE UNIQUE INDEX "MatchSettings_tournamentId_key" ON "MatchSettings"("tournamentId");

-- CreateIndex
CREATE UNIQUE INDEX "TournamentRules_tournamentId_key" ON "TournamentRules"("tournamentId");

-- AddForeignKey
ALTER TABLE "TournamentRules" ADD CONSTRAINT "TournamentRules_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchSettings" ADD CONSTRAINT "MatchSettings_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
