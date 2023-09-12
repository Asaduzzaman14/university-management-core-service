import { OfferedCourseSection } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { OfferedCourseClassScheduleUtils } from './../offeredCourseClassSchedule/offeredCourseClassSchedule.utils';
import {
  IClassSchedule,
  IOfferedCourseSectionCreate,
} from './offeredCourseSection.interface';

const insertInToDB = async (
  payload: IOfferedCourseSectionCreate
): Promise<OfferedCourseSection | null> => {
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

  await asyncForEach(classSchedule, async (schedule: any) => {
    await OfferedCourseClassScheduleUtils.checkRoomAvailable(schedule);
    await OfferedCourseClassScheduleUtils.checkFacultyAvailable(schedule);
  });

  const offeredCourseSectionData = await prisma.offeredCourseSection.findFirst({
    where: {
      offeredCourse: {
        id: data.offeredCourseId,
      },
      title: data.title,
    },
  });

  if (offeredCourseSectionData) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Offered Course Section already exist'
    );
  }

  const createSection = await prisma.$transaction(async trancationClient => {
    //
    const createOfferedCourseSection =
      await trancationClient.offeredCourseSection.create({
        data: {
          title: data.title,
          maxCapacity: data.maxCapacity,
          offeredCourseId: data.offeredCourseId,
          semesterRegistrationId: isExistOfferedCourse.semesterRegistrationId,
        },
      });

    const scheduleData = classSchedule.map((schedule: IClassSchedule) => ({
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      dayOfWeek: schedule.dayOfWeek,
      roomId: schedule.roomId,
      facultyId: schedule.facultyId,
      offeredCourseSectionId: createOfferedCourseSection.id,
      semesterRegistrationId: isExistOfferedCourse.semesterRegistrationId,
    }));

    await trancationClient.offeredCourseClassSchedule.createMany({
      data: scheduleData,
    });

    return createOfferedCourseSection;
  });

  const result = await prisma.offeredCourseSection.findFirst({
    where: {
      id: createSection.id,
    },
    include: {
      offeredCourse: {
        include: {
          course: true,
        },
      },
      offeredCourseClassSchedules: {
        include: {
          room: {
            include: {
              building: true,
            },
          },
          faculty: true,
        },
      },
    },
  });

  return result;
};

export const OfferedCourseSectionServices = {
  insertInToDB,
};
