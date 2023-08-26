export type ICourseCreateData = {
  title: string;
  code: string;
  creadits: string;
  preRequisiteCourses: IPrerequisiteCourseRequest[];
};

export type IPrerequisiteCourseRequest = {
  courseId: string;
  isDeleted?: null;
};

export type IPrerequisitCourseRequest = {
  courseId: string;
  isDeleted?: null;
};

export type ICourseFilterRequest = {
  searchTerm?: string | undefined;
};
