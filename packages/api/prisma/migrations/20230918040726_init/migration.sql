-- CreateEnum
CREATE TYPE "QuizStatus" AS ENUM ('NOT_STARTED', 'ONGOING', 'ENDED');

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "status" "QuizStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "authorId" TEXT NOT NULL,
    "questionBankId" INTEGER NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);
