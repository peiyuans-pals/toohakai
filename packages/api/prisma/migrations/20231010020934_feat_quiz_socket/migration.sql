-- CreateEnum
CREATE TYPE "QuizParticipantConnectionStatus" AS ENUM ('CONNECTED', 'DISCONNECTED');

-- CreateTable
CREATE TABLE "QuizParticipant" (
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "connectionStatus" "QuizParticipantConnectionStatus" NOT NULL,
    "quizId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "QuizParticipant_quizId_userId_key" ON "QuizParticipant"("quizId", "userId");

-- AddForeignKey
ALTER TABLE "QuizParticipant" ADD CONSTRAINT "QuizParticipant_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizParticipant" ADD CONSTRAINT "QuizParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
