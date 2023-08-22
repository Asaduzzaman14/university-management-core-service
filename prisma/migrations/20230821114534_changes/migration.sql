/*
  Warnings:

  - You are about to drop the column `ademicSemester` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `fastName` on the `students` table. All the data in the column will be lost.
  - Added the required column `ademicSemesterId` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fistName` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_ademicSemester_fkey";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "ademicSemester",
DROP COLUMN "fastName",
ADD COLUMN     "ademicSemesterId" TEXT NOT NULL,
ADD COLUMN     "fistName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_ademicSemesterId_fkey" FOREIGN KEY ("ademicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
