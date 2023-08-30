import { OfferedCourseClassSchedule } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createOfferedCourseClassSchedule = async (
  data: OfferedCourseClassSchedule
): Promise<OfferedCourseClassSchedule> => {
  const alreadyBookedRoomOnDay =
    await prisma.offeredCourseClassSchedule.findMany({
      where: {
        dayOfWeek: data.dayOfWeek,
        room: {
          id: data.roomId,
        },
      },
    });

  console.log(alreadyBookedRoomOnDay);

  const existingSlots = alreadyBookedRoomOnDay.map(schedule => ({
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    dayOfWeek: schedule.dayOfWeek,
  }));

  const newSlot = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfWeek,
  };

  console.log('existing slot', existingSlots);
  console.log('new slot', newSlot);

  for (const slot of existingSlots) {
    const existingStart = new Date(`2020-01-01T${slot.startTime}:00`);
    const existingEnd = new Date(`2020-01-01T${slot.endTime}:00`);
    const newStart = new Date(`2020-01-01T${newSlot.startTime}:00`);
    const newEnd = new Date(`2020-01-01T${newSlot.endTime}:00`);

    if (newStart < existingEnd && newEnd > existingStart) {
      throw new ApiError(httpStatus.CONFLICT, 'Rooms is already busy!');
    }
  }

  const result = await prisma.offeredCourseClassSchedule.create({
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
