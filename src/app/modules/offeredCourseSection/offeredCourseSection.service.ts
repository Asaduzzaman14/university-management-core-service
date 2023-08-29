import { OfferedCourseSection } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertInToDB = async (
  data: OfferedCourseSection
): Promise<OfferedCourseSection> => {
  const result = await prisma.offeredCourseSection.create({
    data,
  });
  return result;
};

export const OfferedCourseSectionServices = {
  insertInToDB,
};
