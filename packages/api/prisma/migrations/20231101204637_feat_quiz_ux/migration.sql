/*
  Warnings:

  - A unique constraint covering the columns `[quizId,userId,questionId]` on the table `QuizResponse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QuizResponse_quizId_userId_questionId_key" ON "QuizResponse"("quizId", "userId", "questionId");
