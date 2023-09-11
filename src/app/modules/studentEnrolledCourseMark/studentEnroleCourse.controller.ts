import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StudentEnrolledCourseMarkService } from './studentEnrolledCourseMark.service';

const updateStudentMarks = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentEnrolledCourseMarkService.studentMarks(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'mark updated',
    data: result,
  });
});

const updateFinalMarks = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentEnrolledCourseMarkService.updateFinalMarks(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Final Marks updated',
    data: result,
  });
});

export const StudentEnroleCourseMarkController = {
  updateStudentMarks,
  updateFinalMarks,
};
