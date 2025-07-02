/*
  Warnings:

  - A unique constraint covering the columns `[rulesId]` on the table `Tournament` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[matchSettingsId]` on the table `Tournament` will be added. If there are existing duplicate values, this will fail.
  - Made the column `rulesId` on table `Tournament` required. This step will fail if there are existing NULL values in that column.
  - Made the column `matchSettingsId` on table `Tournament` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Tournament" DROP CONSTRAINT "Tournament_matchSettingsId_fkey";

-- DropForeignKey
ALTER TABLE "Tournament" DROP CONSTRAINT "Tournament_rulesId_fkey";

-- AlterTable
ALTER TABLE "Tournament" ALTER COLUMN "rulesId" SET NOT NULL,
ALTER COLUMN "matchSettingsId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_rulesId_key" ON "Tournament"("rulesId");

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_matchSettingsId_key" ON "Tournament"("matchSettingsId");

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_rulesId_fkey" FOREIGN KEY ("rulesId") REFERENCES "TournamentRules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_matchSettingsId_fkey" FOREIGN KEY ("matchSettingsId") REFERENCES "MatchSettings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
