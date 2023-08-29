import { OfferedCourse } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { ICreateOfferedCourse } from './offeredCourse.interface';

const createOfferedCourse = async (
  data: ICreateOfferedCourse
): Promise<OfferedCourse[]> => {
  console.log(data);

  //
  const { academicDepartmentId, semesterRegistrationId, coursesIds } = data;
  const result: any[] = [];

  await asyncForEach(coursesIds, async (courseId: string) => {
    console.log(courseId);

    const insertOfferedCourse = await prisma.offeredCourse.create({
      data: {
        courseId,
        academicDepartmentId,
        semesterRegistrationId,
      },
    });
    result.push(insertOfferedCourse);
  });
  return result;
};

export const OfferedCourseService = {
  createOfferedCourse,
};
