export type ICourseCreateData = {
  title: string;
  code: string;
  creadits: string;
  preRequisiteCourses: {
    courseId: string;
  }[];
};

export type ICourseFilterRequest = {
  searchTerm?: string | undefined;
};
