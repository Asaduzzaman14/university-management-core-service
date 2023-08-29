import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { OfferedCourseService } from './offeredCourse.service';

const createOfferedCourse = async (req: Request, res: Response) => {
  const result = await OfferedCourseService.createOfferedCourse(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course created',
    data: result,
  });
};

export const OffetedCourseController = {
  createOfferedCourse,
};
