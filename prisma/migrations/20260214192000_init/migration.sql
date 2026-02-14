-- Create enums
CREATE TYPE "Role" AS ENUM ('MEMBER', 'HOST', 'VOLUNTEER', 'ADMIN');
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'DENIED');
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE "RSVPStatus" AS ENUM ('PENDING', 'APPROVED', 'WAITLIST', 'CANCELLED');
CREATE TYPE "RecurrenceFrequency" AS ENUM ('WEEKLY', 'MONTHLY');

CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "name" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL
);

CREATE TABLE "UserRole" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "role" "Role" NOT NULL,
  CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
  UNIQUE("userId", "role")
);

CREATE TABLE "MemberApplication" (
  "id" TEXT PRIMARY KEY,
  "fullName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "motivation" TEXT NOT NULL,
  "honeypot" TEXT DEFAULT '',
  "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "reviewedAt" TIMESTAMP,
  "reviewNotes" TEXT
);

CREATE TABLE "Event" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "area" TEXT NOT NULL,
  "exactAddress" TEXT NOT NULL,
  "startDateTime" TIMESTAMP NOT NULL,
  "endDateTime" TIMESTAMP NOT NULL,
  "timezone" TEXT NOT NULL DEFAULT 'Europe/Brussels',
  "capacity" INTEGER NOT NULL,
  "status" "EventStatus" NOT NULL DEFAULT 'PENDING',
  "recurrenceEnabled" BOOLEAN NOT NULL DEFAULT false,
  "recurrenceFreq" "RecurrenceFrequency",
  "recurrenceInterval" INTEGER DEFAULT 1,
  "recurrenceCount" INTEGER,
  "hostId" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL,
  "reviewedAt" TIMESTAMP,
  "reviewNotes" TEXT,
  CONSTRAINT "Event_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT
);

CREATE TABLE "RSVP" (
  "id" TEXT PRIMARY KEY,
  "eventId" TEXT NOT NULL,
  "token" TEXT NOT NULL UNIQUE,
  "contactName" TEXT,
  "contactEmail" TEXT,
  "status" "RSVPStatus" NOT NULL DEFAULT 'PENDING',
  "isAnonymous" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "RSVP_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE
);

CREATE TABLE "ChatSettings" (
  "id" TEXT PRIMARY KEY DEFAULT 'singleton',
  "timezone" TEXT NOT NULL DEFAULT 'Europe/Brussels',
  "openHour" INTEGER NOT NULL DEFAULT 17,
  "closeHour" INTEGER NOT NULL DEFAULT 22,
  "transcriptStorageEnabled" BOOLEAN NOT NULL DEFAULT false,
  "updatedAt" TIMESTAMP NOT NULL
);

CREATE TABLE "ChatSession" (
  "id" TEXT PRIMARY KEY,
  "startedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "endedAt" TIMESTAMP,
  "durationSec" INTEGER,
  "flagged" BOOLEAN NOT NULL DEFAULT false,
  "volunteerId" TEXT,
  "metadata" TEXT,
  CONSTRAINT "ChatSession_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "User"("id") ON DELETE SET NULL
);

CREATE TABLE "ChatFlag" (
  "id" TEXT PRIMARY KEY,
  "chatSessionId" TEXT,
  "reason" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "reporterType" TEXT NOT NULL
);

CREATE TABLE "AdminSetting" (
  "id" TEXT PRIMARY KEY DEFAULT 'singleton',
  "key" TEXT NOT NULL UNIQUE,
  "value" TEXT NOT NULL
);

CREATE TABLE "AuditLog" (
  "id" TEXT PRIMARY KEY,
  "actorId" TEXT NOT NULL,
  "action" TEXT NOT NULL,
  "targetType" TEXT NOT NULL,
  "targetId" TEXT NOT NULL,
  "detail" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT
);

CREATE TABLE "Account" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" INTEGER,
  "token_type" TEXT,
  "scope" TEXT,
  "id_token" TEXT,
  "session_state" TEXT,
  CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
  UNIQUE("provider", "providerAccountId")
);

CREATE TABLE "Session" (
  "id" TEXT PRIMARY KEY,
  "sessionToken" TEXT NOT NULL UNIQUE,
  "userId" TEXT NOT NULL,
  "expires" TIMESTAMP NOT NULL,
  CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE TABLE "VerificationToken" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL UNIQUE,
  "expires" TIMESTAMP NOT NULL,
  UNIQUE("identifier", "token")
);
