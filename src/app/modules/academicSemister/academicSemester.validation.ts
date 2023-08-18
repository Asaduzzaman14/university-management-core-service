import { z } from 'zod';

const create = z.object({
  body: z.object({
    year: z.number({
      required_error: 'Year is requires and must be number',
    }),
    title: z.string({
      required_error: 'Title is requires',
    }),
    code: z.string({
      required_error: 'Code is required',
    }),
    startMonth: z.string({
      required_error: 'Start month is required',
    }),
    endMonth: z.string({
      required_error: 'End month is required',
    }),
  }),
});

export const AcademicSemesterValidation = {
  create,
};
