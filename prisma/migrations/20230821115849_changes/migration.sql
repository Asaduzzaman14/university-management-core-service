/*
  Warnings:

  - You are about to drop the column `ademicSemesterId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the `facultys` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `academicSemesterId` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "facultys" DROP CONSTRAINT "facultys_academicDepartmentId_fkey";

-- DropForeignKey
ALTER TABLE "facultys" DROP CONSTRAINT "facultys_academicFacultyId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_ademicSemesterId_fkey";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "ademicSemesterId",
ADD COLUMN     "academicSemesterId" TEXT NOT NULL;

-- DropTable
DROP TABLE "facultys";

-- CreateTable
CREATE TABLE "faculties" (
    "id" TEXT NOT NULL,
    "faucultyId" TEXT NOT NULL,
    "fastName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "academicDepartmentId" TEXT NOT NULL,
    "academicFacultyId" TEXT NOT NULL,

    CONSTRAINT "faculties_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "academic_faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
