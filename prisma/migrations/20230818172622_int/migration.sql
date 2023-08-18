/*
  Warnings:

  - You are about to drop the column `ademicSemister` on the `students` table. All the data in the column will be lost.
  - Added the required column `ademicSemester` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_ademicSemister_fkey";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "ademicSemister",
ADD COLUMN     "ademicSemester" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_ademicSemester_fkey" FOREIGN KEY ("ademicSemester") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
