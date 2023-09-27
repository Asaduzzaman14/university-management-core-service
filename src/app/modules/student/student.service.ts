import { Prisma, Student, StudentEnrolledCourseStatus } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  studentRelationalFields,
  studentRelationalFieldsMapper,
  studentSearchableFields,
} from './student.constance';
import { IStudentFilterRequest } from './student.interface';
import { studentUtils } from './student.utils';

const insertIntoDB = async (data: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data: data,
    include: {
      academicSemester: true,
      academicDepartment: true,
      academicfaculty: true,
    },
  });
  console.log(result);

  return result;
};

const getAllFromDB = async (
  filters: IStudentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: studentSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (studentRelationalFields.includes(key)) {
          return {
            [studentRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.student.findMany({
    include: {
      academicSemester: true,
      academicDepartment: true,
      academicfaculty: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.student.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: {
      id,
    },
    include: {
      academicSemester: true,
      academicDepartment: true,
      academicfaculty: true,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Student>
): Promise<Student> => {
  const result = await prisma.student.update({
    where: {
      id,
    },
    data: payload,
    include: {
      academicSemester: true,
      academicDepartment: true,
      academicfaculty: true,
    },
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<Student> => {
  const result = await prisma.student.delete({
    where: {
      id,
    },
    include: {
      academicSemester: true,
      academicDepartment: true,
      academicfaculty: true,
    },
  });
  return result;
};

const myCourses = async (
  authUserId: string,
  filter: {
    courseId?: string | undefined;
    academicSemesterId?: string | undefined;
  }
) => {
  if (!filter.academicSemesterId) {
    const currentSemester = await prisma.academicSemester.findFirst({
      where: {
        isCurrent: true,
      },
    });
    filter.academicSemesterId = currentSemester?.id;
  }

  const result = await prisma.studentEnrolledCourse.findMany({
    where: {
      student: {
        studentId: authUserId,
      },
      ...filter,
    },
    include: {
      course: true,
    },
  });

  return result;
};

const getMyCourseSchedule = async (
  authUserId: string,
  filter: {
    courseId?: string | undefined;
    academicSemesterId?: string | undefined;
  }
) => {
  console.log(authUserId, filter);

  if (!filter.academicSemesterId) {
    const currentSemester = await prisma.academicSemester.findFirst({
      where: {
        isCurrent: true,
      },
    });
    filter.academicSemesterId = currentSemester?.id;
  }

  const studentEnroledCourse = await myCourses(authUserId, filter);

  const studentEnroleCoursesIds = studentEnroledCourse.map(
    item => item.courseId
  );

  const result = await prisma.studentSemesterRegistrationCourse.findMany({
    where: {
      student: {
        studentId: authUserId,
      },
      semesterRegistration: {
        academicSemester: {
          id: filter.academicSemesterId,
        },
      },
      offeredCourse: {
        course: {
          id: {
            in: studentEnroleCoursesIds,
          },
        },
      },
    },
    include: {
      offeredCourse: {
        include: {
          course: true,
        },
      },
      offeredCourseSection: {
        include: {
          offeredCourseClassSchedules: {
            include: {
              room: {
                include: {
                  building: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return result;
};

const myAcademicInfo = async (authuserId: string): Promise<any> => {
  console.log(authuserId);

  const academicInfo = await prisma.studentAcademicInfo.findFirst({
    where: {
      student: {
        studentId: authuserId,
      },
    },
    include: {
      student: true,
    },
  });

  const enroleCourse = await prisma.studentEnrolledCourse.findMany({
    where: {
      student: {
        studentId: authuserId,
      },
      status: StudentEnrolledCourseStatus.COMPLETED,
    },
    include: {
      course: true,
      academicSemester: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  // console.log(myAcademicInfo);
  // console.log(enroleCourse);

  studentUtils.groupAcademicSemester(enroleCourse);

  return {
    academicInfo,
    enroleCourse,
  };
};

const createStudentFromEvent = async (e: any) => {
  const studentData: Partial<Student> = {
    studentId: e.id,
    firstName: e.name.fastName,
    lastName: e.name.lastName,
    middleName: e.name.middleName,
    email: e.email,
    contactNo: e.contactNo,
    gender: e.gender,
    bloodGroup: e.bloodGroup,
    academicSemesterId: e.academicSemester.syncId,
    academicDepartmentId: e.academicDepartment.syncId,
    academicFacultyId: e.academicFaculty.syncId,
  };
  console.log(studentData);

  await insertIntoDB(studentData as Student);
};

export const StudentService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  myCourses,

  getMyCourseSchedule,
  myAcademicInfo,

  createStudentFromEvent,
};
