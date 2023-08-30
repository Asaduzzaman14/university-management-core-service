import { OfferedCourseSection } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertInToDB = async (data: any): Promise<OfferedCourseSection> => {
  const isExistOfferedCourse = prisma.offeredCourse.findFirst({
    where: {
      id: data.offeredCourseId,
    },
  });

  if (!isExistOfferedCourse) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Offered Course does not exist');
  }

  data.semesterRegistrationId = isExistOfferedCourse.semesterRegistration;
  const result = await prisma.offeredCourseSection.create({
    data,
  });
  return result;
};

export const OfferedCourseSectionServices = {
  insertInToDB,
};
