/*
  Warnings:

  - Added the required column `numOfQuestions` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timePerQuestion` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "numOfQuestions" INTEGER NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3),
ADD COLUMN     "timePerQuestion" INTEGER NOT NULL;
