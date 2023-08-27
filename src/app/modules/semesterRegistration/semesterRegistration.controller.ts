import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

const insertInToDb = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.insertInToDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester registration created',
    data: result,
  });
});

export const SemesterRegistrationController = {
  insertInToDb,
};
