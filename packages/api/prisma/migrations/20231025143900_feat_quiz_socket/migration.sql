-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "currentQuestionId" INTEGER,
ADD COLUMN     "currentQuestionReviewPause" BOOLEAN,
ADD COLUMN     "currentQuestionReviewTime" TIMESTAMP(3),
ADD COLUMN     "currentQuestionStartTime" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_currentQuestionId_fkey" FOREIGN KEY ("currentQuestionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
