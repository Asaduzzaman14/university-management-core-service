export const asyncForEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new Error('Expected an array');
  }

  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

// const createPrerequisite =
// await transactionClient.courseToPrerequisite.create({
//   data: {
//     courseId: result.id,
//     preRequisiteId: preRequisiteCourses[index].courseId,
//   },
// });
// console.log(createPrerequisite);
