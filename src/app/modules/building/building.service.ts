import { Building, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { buildingFilterableFieldes } from './building.constants';
import { IBuildingFilterRequest } from './building.interfact';

const createBuilding = async (data: Building): Promise<Building> => {
  console.log(data, 'this is data');

  const result = await prisma.building.create({
    data,
  });
  return result;
};

const getAllBuilding = async (
  filters: IBuildingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Building[]>> => {
  console.log(filters, options);

  // paginations
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  // search data
  const { searchTerm } = filters;
  const andCondations = [];

  if (searchTerm) {
    andCondations.push({
      OR: buildingFilterableFieldes.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereCondations: Prisma.BuildingWhereInput =
    andCondations.length > 0 ? { AND: andCondations } : {};

  const result = await prisma.building.findMany({
    skip,
    take: limit,
    where: whereCondations,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.building.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getBuildingById = async (id: string): Promise<Building | null> => {
  const result = await prisma.building.findUnique({
    where: { id },
  });

  return result;
};

const updateBuildingInDB = async (
  id: string,
  payload: Partial<Building>
): Promise<Building> => {
  const result = await prisma.building.update({
    where: {
      id,
    },
    data: payload,
    include: {
      rooms: true,
    },
  });
  return result;
};

const deleteBuildingById = async (id: string): Promise<Building> => {
  const result = await prisma.building.delete({
    where: {
      id,
    },
    include: {
      rooms: true,
    },
  });
  return result;
};

export const BuildingService = {
  createBuilding,
  getAllBuilding,
  getBuildingById,
  updateBuildingInDB,
  deleteBuildingById,
};
