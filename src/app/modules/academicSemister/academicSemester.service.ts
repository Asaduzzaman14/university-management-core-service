import { AcademicSemester, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createSemester = async (
  academicSemisterData: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data: academicSemisterData,
  });
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
