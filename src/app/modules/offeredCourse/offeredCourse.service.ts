import { OfferedCourse } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { ICreateOfferedCourse } from './offeredCourse.interface';

const createOfferedCourse = async (
  data: ICreateOfferedCourse
): Promise<OfferedCourse[]> => {
  const { academicDepartmentId, semesterRegistrationId, coursesIds } = data;
  const result: OfferedCourse[] = [];

  await asyncForEach(coursesIds, async (courseId: string) => {
    const isAlreadyExist = await prisma.offeredCourse.findFirst({
      where: {
        courseId,
        academicDepartmentId,
        semesterRegistrationId,
      },
    });
    if (!isAlreadyExist) {
      const insertOfferedCourse = await prisma.offeredCourse.create({
        data: {
          courseId,
          academicDepartmentId,
          semesterRegistrationId,
        },
        include: {
          course: true,
          academicDepartment: true,
          semesterRegistration: true,
        },
      });
      result.push(insertOfferedCourse);
    }
  });
  return result;
};

export const OfferedCourseService = {
  createOfferedCourse,
};
