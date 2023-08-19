import { AcademicSemester, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from './../../../interfaces/pagination';
import { AcademicSemesterSearchableField } from './academicSemester.constance';
import { IAcademicSemesterFilterRequest } from './academicsemester.interface';

const prisma = new PrismaClient();

const createSemester = async (
  academicSemisterData: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data: academicSemisterData,
  });
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

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
};
