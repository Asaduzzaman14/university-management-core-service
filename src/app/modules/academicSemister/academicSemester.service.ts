import { AcademicSemester, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import prisma from '../../../shared/prisma';
import { RedisClient } from '../../../shared/redis';
import { IPaginationOptions } from './../../../interfaces/pagination';
import {
  AcademicSemesterSearchableField,
  EVENT_ACADEMIC_SEMESTER_CREATED,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constance';
import { IAcademicSemesterFilterRequest } from './academicsemester.interface';

const createSemester = async (
  academicSemisterData: AcademicSemester
): Promise<AcademicSemester> => {
  if (
    academicSemesterTitleCodeMapper[academicSemisterData.title] !==
    academicSemisterData.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }

  const result = await prisma.academicSemester.create({
    data: academicSemisterData,
  });

  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_SEMESTER_CREATED,
      JSON.stringify(result)
    );
  }

  return result;
};

const getAllSemester = async (
  filters: IAcademicSemesterFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  console.log(filters, options);

  // paginations
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // search data
  const { searchTerm, ...filterData } = filters;
  console.log(filterData);

  const andCondations = [];

  if (searchTerm) {
    andCondations.push({
      OR: AcademicSemesterSearchableField.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // filter data
  if (Object.keys(filterData).length > 0) {
    andCondations.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  // console.log(andCondations);

  const whereCondations: Prisma.AcademicSemesterWhereInput =
    andCondations.length > 0 ? { AND: andCondations } : {};

  const result = await prisma.academicSemester.findMany({
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

  const total = await prisma.academicSemester.count();
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

const getSemesterById = async (
  id: string
): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: { id },
  });
  console.log(result);

  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<AcademicSemester>
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.update({
    where: {
      id,
    },
    data: payload,
  });
  // if (result) {
  //     await RedisClient.publish(EVENT_ACADEMIC_SEMESTER_UPDATED, JSON.stringify(result))
  // }
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.delete({
    where: {
      id,
    },
  });

  // if (result) {
  //     await RedisClient.publish(EVENT_ACADEMIC_SEMESTER_DELETED, JSON.stringify(result));
  // }
  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
  getSemesterById,
  updateOneInDB,
  deleteByIdFromDB,
};
