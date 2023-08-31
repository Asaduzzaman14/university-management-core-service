import { OfferedCourseClassSchedule, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { hasTimeConflict } from '../../../shared/utils';
import { offeredCourseClassScheduleSearchableFields } from './offeredCourseClassSchedule.constants';
import {
  IOfferedCourseClassSchedulFilterRequest,
  offeredCourseClassScheduleRelationalFields,
  offeredCourseClassScheduleRelationalFieldsMapper,
} from './offeredCourseClassSchedule.interface';

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

  if (hasTimeConflict(existingSlots, newSlot)) {
    throw new ApiError(httpStatus.CONFLICT, 'Rooms is already busy!');
  }

  // for (const slot of existingSlots) {
  //   const existingStart = new Date(`2020-01-01T${slot.startTime}:00`);
  //   const existingEnd = new Date(`2020-01-01T${slot.endTime}:00`);
  //   const newStart = new Date(`2020-01-01T${newSlot.startTime}:00`);
  //   const newEnd = new Date(`2020-01-01T${newSlot.endTime}:00`);

  //   if (newStart < existingEnd && newEnd > existingStart) {
  //     throw new ApiError(httpStatus.CONFLICT, 'Rooms is already busy!');
  //   }
  // }

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

const getAllFromDB = async (
  filters: IOfferedCourseClassSchedulFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourseClassSchedule[]>> => {
  console.log(filters, options);

  // paginations
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // search data
  const { searchTerm, ...filterData } = filters;
  console.log(filterData);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: offeredCourseClassScheduleSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // filter data
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (offeredCourseClassScheduleRelationalFields.includes(key)) {
          return {
            [offeredCourseClassScheduleRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  // console.log(andCondations);

  const whereCondations: Prisma.OfferedCourseClassScheduleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offeredCourseClassSchedule.findMany({
    include: {
      semesterRegistration: true,
      offeredCourseSection: true,
      faculty: true,
      room: true,
    },
    where: whereCondations,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.offeredCourseClassSchedule.count();
  console.log(result);

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const OfferedCourseClassScheduleService = {
  createOfferedCourseClassSchedule,
  getAllFromDB,
};
