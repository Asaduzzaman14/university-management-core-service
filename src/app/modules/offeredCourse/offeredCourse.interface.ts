export type ICreateOfferedCourse = {
  academicDepartmentId: string;
  semesterRegistrationId: string;
  courseIds: [];
};
export type IOfferedCourseFilterRequest = {
  searchTerm?: string | undefined;
  semesterRegistrationId?: string | undefined;
  courseId?: string | undefined;
  academicDepartmentId?: string | undefined;
};
