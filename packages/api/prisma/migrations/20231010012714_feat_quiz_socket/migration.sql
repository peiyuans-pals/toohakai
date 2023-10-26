/*
  Warnings:

  - Added the required column `pinCode` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "pinCode" TEXT NOT NULL default '123456';
