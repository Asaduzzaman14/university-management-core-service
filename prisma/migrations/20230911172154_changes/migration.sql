/*
  Warnings:

  - The `credits` column on the `courses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "credits",
ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 0;
