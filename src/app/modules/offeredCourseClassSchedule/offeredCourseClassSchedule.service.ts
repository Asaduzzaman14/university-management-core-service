import { OfferedCourseClassSchedule } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createOfferedCourseClassSchedule = async (
  data: OfferedCourseClassSchedule
): Promise<OfferedCourseClassSchedule> => {
  const result = prisma.offeredCourseClassSchedule.create({
    data,
    include: {
      offeredCourseSection: true,
      semesterRegistration: true,
      room: true,
      faculty: true,
    },
  });
  return result;
};

export const OfferedCourseClassScheduleService = {
  createOfferedCourseClassSchedule,
};
