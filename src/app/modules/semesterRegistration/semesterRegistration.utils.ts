const getAvailableCourses = (
  offeredCourses: any,
  studentCompletedCourse: any,
  studentCurrentlyTakenCourses: any
) => {
  const completedCourseId = studentCompletedCourse.map(
    (course: any) => course.courseId
  );

  const availableCourseList = offeredCourses
    .filter(
      (offeredCourse: any) =>
        !completedCourseId.includes(offeredCourse.courseId)
    )
    .filter((course: any) => {
      const preRequisites = course.course.preRequisite;

      if (preRequisites.lenght === 0) {
        return true;
      } else {
        const preRequisiteIdes = preRequisites.map(
          (preRequisit: any) => preRequisit.preRequisiteId
        );
        return preRequisiteIdes.every((id: string) =>
          completedCourseId.includes(id)
        );
      }
    })
    .map((course: any) => {
      const isAlreadyTakenCourse = studentCurrentlyTakenCourses.find(
        (c: any) => c.offeredCOurseId === course.id
      );
      if (isAlreadyTakenCourse) {
        course.offeredCourseSection.map((section: any) => {
          if (section.id === isAlreadyTakenCourse.offeredCourseSectionId) {
            section.isTaken = true;
          } else {
            section.isTaken = false;
          }
        });
        return {
          ...course,
          isTaken: true,
        };
      } else {
        course.offeredCourseSections.map((section: any) => {
          section.isTaken = false;
        });
        return {
          ...course,
          isTaken: false,
        };
      }
    });
  return availableCourseList;
};

export const SemesterRegistrationUtils = {
  getAvailableCourses,
};
