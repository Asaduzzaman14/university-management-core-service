import { OfferedCourseSection } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { OfferedCourseClassScheduleUtils } from './../offeredCourseClassSchedule/offeredCourseClassSchedule.utils';

const insertInToDB = async (payload: any): Promise<OfferedCourseSection> => {
  const { classSchedule, ...data } = payload;

  const isExistOfferedCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: data.offeredCourseId,
    },
  });

  if (!isExistOfferedCourse) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Offered Course does not exist');
  }
  console.log(data, 'this is data');

  data.semesterRegistrationId = isExistOfferedCourse.semesterRegistrationId;

  await asyncForEach(classSchedule, async (schedule: any) => {
    await OfferedCourseClassScheduleUtils.checkRoomAvailable(schedule);
    await OfferedCourseClassScheduleUtils.checkFacultyAvailable(schedule);
  });

  const createSection = prisma.$transaction(async trancationClient => {
    const createOfferedCourseSection =
      await trancationClient.offeredCourseSection.create({
        data,
      });

    const scheduleData = classSchedule.map((schedule: any) => ({
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      dayOfWeek: schedule.dayOfWeek,
      roomId: schedule.roomId,
      facultyId: schedule.facultyId,
      offeredCourseSectionId: createOfferedCourseSection.id,
      semesterRegistrationId: isExistOfferedCourse.semesterRegistrationId,
    }));

    const createSchedule =
      await trancationClient.offeredCourseClassSchedule.createMany({
        data: scheduleData,
      });

    return createSchedule;

    // console.log(scheduleData);
  });
};

export const OfferedCourseSectionServices = {
  insertInToDB,
};
