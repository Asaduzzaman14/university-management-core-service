export const AcademicSemesterSearchableField = [
  'title',
  'code',
  'startMonth',
  'endMonth',
];

export const AcademicSemisterFilterAbleFeild = [
  'searchTerm',
  'code',
  'startMonth',
  'endMonth',
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterTitles: string[] = ['Autum', 'Summer', 'Fall'];
export const academicSemesterCodes: string[] = ['01', '02', '03'];
export const academicSemesterMonths: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const EVENT_ACADEMIC_SEMESTER_CREATED = 'academic-semester.crated';
export const EVENT_ACADEMIC_SEMESTER_UPDATED = 'academic-semester.updated';
