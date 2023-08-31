export type IOfferedCourseClassSchedulFilterRequest = {
  searchTerm?: string | null;
  semesterRegistrationId?: string | null;
  roomId?: string | null;
  facultyId?: string | null;
};

export const offeredCourseClassScheduleRelationalFields = [
  'offeredCourseSectionId',
  'semesterRegistrationId',
  'roomId',
  'facultyId',
];

export const offeredCourseClassScheduleRelationalFieldsMapper: {
  [key: string]: string;
} = {
  offeredCourseSectionId: 'offeredCourseSection',
  semesterRegistrationId: 'semesterRegistration',
  roomId: 'room',
  facultyId: 'faculty',
};
