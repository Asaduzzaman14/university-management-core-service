/*
  Warnings:

  - You are about to drop the column `fastName` on the `faculties` table. All the data in the column will be lost.
  - You are about to drop the column `fistName` on the `students` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `faculties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "faculties" DROP COLUMN "fastName",
ADD COLUMN     "firstName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "fistName",
ADD COLUMN     "firstName" TEXT NOT NULL;
