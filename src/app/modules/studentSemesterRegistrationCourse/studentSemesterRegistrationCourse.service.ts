import { SemesterRegistrationStatus } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IInroleCoursePayload } from '../semesterRegistration/semesterRegistration.interface';

const enroleIntCourse = async (
  authuserId: string,
  payload: IInroleCoursePayload
): Promise<{ message: string }> => {
  const student = await prisma.student.findFirst({
    where: {
      studentId: authuserId,
    },
  });

  const semesterRegistraion = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING,
    },
  });

  const offeredCourse = await prisma.offeredCourse.findFirst({
    where: { id: payload.offeredCourseId },
    include: {
      course: true,
    },
  });

  const offeredCourseSection = await prisma.offeredCourseSection.findFirst({
    where: { id: payload.offeredCourseSectionId },
  });

  if (!offeredCourseSection) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'offered Course Section not Found'
    );
  }
  if (!offeredCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Offered Course not Found');
  }

  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not Found');
  }

  if (!semesterRegistraion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SemesterRegistraion not Found');
  }

  if (
    offeredCourseSection.maxCapacity &&
    offeredCourseSection?.currentlyEnrolledStudent &&
    offeredCourseSection?.currentlyEnrolledStudent >=
      offeredCourseSection.maxCapacity
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student capacity is full');
  }

  await prisma.$transaction(async transactionClient => {
    await transactionClient.studentSemesterRegistrationCourse.create({
      data: {
        studentId: student?.id,
        semesterRegistrationId: semesterRegistraion?.id,
        offeredCourseId: payload.offeredCourseId,
        offeredCourseSectionId: payload.offeredCourseSectionId,
      },
    });

    await transactionClient.offeredCourseSection.update({
      where: {
        id: payload.offeredCourseSectionId,
      },
      data: {
        currentlyEnrolledStudent: {
          increment: 1,
        },
      },
    });

    await transactionClient.studentSemesterRegistration.updateMany({
      where: {
        student: {
          id: student.id,
        },
        semesterRegistration: {
          id: semesterRegistraion.id,
        },
      },
      data: {
        totalCreditsTaken: {
          increment: Number(offeredCourse.course.credits),
        },
      },
    });
  });

  return {
    message: 'Succesfully enrole into course',
  };
};

const withdrowFromCourse = async (
  authuserId: string,
  payload: IInroleCoursePayload
): Promise<{ message: string }> => {
  const student = await prisma.student.findFirst({
    where: {
      studentId: authuserId,
    },
  });

  const semesterRegistraion = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING,
    },
  });

  const offeredCourse = await prisma.offeredCourse.findFirst({
    where: { id: payload.offeredCourseId },
    include: {
      course: true,
    },
  });

  if (!offeredCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Offered Course not Found');
  }

  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not Found');
  }

  if (!semesterRegistraion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SemesterRegistraion not Found');
  }

  await prisma.$transaction(async transactionClient => {
    await transactionClient.studentSemesterRegistrationCourse.delete({
      where: {
        semesterRegistrationId_studentId_offeredCourseId: {
          semesterRegistrationId: semesterRegistraion?.id,
          studentId: student?.id,
          offeredCourseId: payload.offeredCourseId,
        },
      },
    });

    await transactionClient.offeredCourseSection.update({
      where: {
        id: payload.offeredCourseSectionId,
      },
      data: {
        currentlyEnrolledStudent: {
          increment: 1,
        },
      },
    });

    await transactionClient.studentSemesterRegistration.updateMany({
      where: {
        student: {
          id: student.id,
        },
        semesterRegistration: {
          id: semesterRegistraion.id,
        },
      },
      data: {
        totalCreditsTaken: {
          decrement: Number(offeredCourse.course.credits),
        },
      },
    });
  });

  return {
    message: 'Succesfully withdrow from course',
  };
};

export const StudentSemesterRegistrationCourseService = {
  enroleIntCourse,
  withdrowFromCourse,
};
