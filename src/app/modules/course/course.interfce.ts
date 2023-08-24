export type ICourseCreateData = {
  title: string;
  code: string;
  creadits: string;
  preRequisiteCourses: {
    courseId: string;
  }[];
};
