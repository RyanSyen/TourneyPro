-- CreateEnum
CREATE TYPE "TournamentType" AS ENUM ('circuit', 'standalone');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tournament" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "type" "TournamentType"[] DEFAULT ARRAY[]::"TournamentType"[],
    "tournamentStart" TIMESTAMP(3) NOT NULL,
    "tournamentEnd" TIMESTAMP(3) NOT NULL,
    "registrationStart" TIMESTAMP(3) NOT NULL,
    "registrationEnd" TIMESTAMP(3) NOT NULL,
    "rulesId" INTEGER,
    "status" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedById" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentRules" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedById" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TournamentRules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchSettings" (
    "id" SERIAL NOT NULL,
    "points" TEXT NOT NULL,
    "changeOfEnds" TEXT NOT NULL,
    "gracePeriod" TEXT NOT NULL,
    "allowSpinServe" BOOLEAN NOT NULL,
    "allowDeuce" BOOLEAN NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedById" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MatchSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentEvent" (
    "id" SERIAL NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    "event" TEXT NOT NULL,
    "ageGroup" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "prize" TEXT,
    "registrationFee" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedById" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TournamentEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedById" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerEvent" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedById" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedById" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PlayerEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Player_email_key" ON "Player"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerEvent_playerId_eventId_key" ON "PlayerEvent"("playerId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_rulesId_fkey" FOREIGN KEY ("rulesId") REFERENCES "TournamentRules"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentRules" ADD CONSTRAINT "TournamentRules_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentRules" ADD CONSTRAINT "TournamentRules_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentRules" ADD CONSTRAINT "TournamentRules_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchSettings" ADD CONSTRAINT "MatchSettings_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchSettings" ADD CONSTRAINT "MatchSettings_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchSettings" ADD CONSTRAINT "MatchSettings_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentEvent" ADD CONSTRAINT "TournamentEvent_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentEvent" ADD CONSTRAINT "TournamentEvent_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentEvent" ADD CONSTRAINT "TournamentEvent_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentEvent" ADD CONSTRAINT "TournamentEvent_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerEvent" ADD CONSTRAINT "PlayerEvent_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerEvent" ADD CONSTRAINT "PlayerEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "TournamentEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerEvent" ADD CONSTRAINT "PlayerEvent_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerEvent" ADD CONSTRAINT "PlayerEvent_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerEvent" ADD CONSTRAINT "PlayerEvent_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
