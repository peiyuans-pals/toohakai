/*
  Warnings:

  - You are about to drop the column `timeLeft` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "timeLeft",
ADD COLUMN     "endEventTime" TIMESTAMP(3),
ADD COLUMN     "startEventTime" TIMESTAMP(3);
