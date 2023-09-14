const groupAcademicSemester = (data: any) => {
  console.log(data);
  const groupData = data.reduce((result: any, course: any) => {
    const academicSemester = course.academicSemester;

    const existingGroup = result.find(
      (group: any) => group.academicSemester.id === academicSemester
    );

    if (existingGroup) {
      existingGroup.completedCourses.push({
        id: course.id,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
        studentId: course.studentId,
        gread: course.point,
        marks: course.totalMarks,
        course: course.course,
      });
    } else {
      result.push({
        academicSemester,
        completedCourse: {
          id: course.id,
          createdAt: course.createdAt,
          updatedAt: course.updatedAt,
          studentId: course.studentId,
          gread: course.point,
          marks: course.totalMarks,
          course: course.course,
        },
      });
    }
    return result;
  }, []);
};
export const studentUtils = { groupAcademicSemester };
