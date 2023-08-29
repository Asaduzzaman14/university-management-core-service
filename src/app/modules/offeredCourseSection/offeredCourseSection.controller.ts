import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OfferedCourseSectionServices } from './offeredCourseSection.service';

const insertInToDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseSectionServices.insertInToDB(req.body);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course Section created',
    data: result,
  });
});

export const OfferedCourseSectionControler = {
  insertInToDB,
};
