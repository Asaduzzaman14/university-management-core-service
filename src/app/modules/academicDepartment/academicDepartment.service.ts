import { AcademicDepartment, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { RedisClient } from '../../../shared/redis';
import {
  AcademicDepartmentSearchAbleFields,
  EVENT_ACADEMIC_DEPARTMENT_CREATED,
  EVENT_ACADEMIC_DEPARTMENT_DELETED,
  EVENT_ACADEMIC_DEPARTMENT_UPDATED,
} from './academicDepartment.constance';
import { IAcademicDepartmentFilterRequest } from './academicDepartment.interface';

const createDepartment = async (
  data: AcademicDepartment
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.create({
    data,
    include: {
      academicFaculty: true,
    },
  });
  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_DEPARTMENT_CREATED,
      JSON.stringify(result)
    );
  }

  return result;
};

const getAllDepartment = async (
  filters: IAcademicDepartmentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicDepartment[]>> => {
  console.log(filters, options);

  // paginations
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // search data
  const { searchTerm, ...filterData } = filters;
  console.log(filterData);

  const andCondations = [];

  if (searchTerm) {
    andCondations.push({
      OR: AcademicDepartmentSearchAbleFields.map(field => ({
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

  const whereCondations: Prisma.AcademicDepartmentWhereInput =
    andCondations.length > 0 ? { AND: andCondations } : {};

  const result = await prisma.academicDepartment.findMany({
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

  const total = await prisma.academicDepartment.count();
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

const getDepartmentById = async (
  id: string
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: { id },
  });
  console.log(result);

  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<AcademicDepartment>
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.update({
    where: {
      id,
    },
    data: payload,
    include: {
      academicFaculty: true,
    },
  });
  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_DEPARTMENT_UPDATED,
      JSON.stringify(result)
    );
  }

  return result;
};

const deleteByIdFromDB = async (id: string): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.delete({
    where: {
      id,
    },
    include: {
      academicFaculty: true,
    },
  });

  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_DEPARTMENT_DELETED,
      JSON.stringify(result)
    );
  }

  return result;
};

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartment,
  getDepartmentById,
  updateOneInDB,
  deleteByIdFromDB,
};
