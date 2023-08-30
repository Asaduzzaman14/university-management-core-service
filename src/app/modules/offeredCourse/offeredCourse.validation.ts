import { z } from 'zod';

const create = z.object({
  body: z.object({
    academicDepartmentId: z.string({
      required_error: 'academicDepartmentId is required',
    }),
    semesterRegistrationId: z.string({
      required_error: 'semesterRegistrationId is required',
    }),
    coursesIds: z.array(
      z.string({
        required_error: 'course Id is required',
      }),
      {
        required_error: 'course Ids are required',
      }
    ),
  }),
});

export const Validations = {
  create,
};
