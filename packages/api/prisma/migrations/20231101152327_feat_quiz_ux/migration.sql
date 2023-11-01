/*
  Warnings:

  - You are about to drop the column `currentQuestionReviewPause` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `currentQuestionReviewTime` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `currentQuestionStartTime` on the `Quiz` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "QuizDisplayMode" AS ENUM ('QUESTION', 'REVIEW');

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "currentQuestionReviewPause",
DROP COLUMN "currentQuestionReviewTime",
DROP COLUMN "currentQuestionStartTime",
ADD COLUMN     "currentQuestionDisplayMode" "QuizDisplayMode";

-- CreateTable
CREATE TABLE "QuizResponse" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quizId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answerId" INTEGER NOT NULL,

    CONSTRAINT "QuizResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuizResponse" ADD CONSTRAINT "QuizResponse_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResponse" ADD CONSTRAINT "QuizResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResponse" ADD CONSTRAINT "QuizResponse_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResponse" ADD CONSTRAINT "QuizResponse_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
