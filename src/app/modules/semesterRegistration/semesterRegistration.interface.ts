export type ISemesterRegistrationFilterRequest = {
  searchTerm?: string | undefined;
  academicSemesterId?: string | undefined;
};

export type IInroleCoursePayload = {
  offeredCourseId: string;
  offeredCourseSectionId: string;
};
