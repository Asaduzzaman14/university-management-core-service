import {
  SemesterRegistration,
  SemesterRegistrationStatus,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertInToDb = async (
  data: SemesterRegistration
): Promise<SemesterRegistration> => {
  const isAnySemesterUpComingOrOnGoing =
    await prisma.semesterRegistration.findFirst({
      where: {
        OR: [
          {
            status: SemesterRegistrationStatus.UPCOMING,
          },
          {
            status: SemesterRegistrationStatus.ONGOING,
          },
        ],
      },
    });

  if (isAnySemesterUpComingOrOnGoing) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `There is already is and ${isAnySemesterUpComingOrOnGoing.status} registration`
    );
  }

  const result = await prisma.semesterRegistration.create({
    data,
  });
  return result;
};

export const SemesterRegistrationService = {
  insertInToDb,
};
