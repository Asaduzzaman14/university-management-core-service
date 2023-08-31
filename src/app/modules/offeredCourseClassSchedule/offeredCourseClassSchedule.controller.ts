import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseClassScheduleFiltarableFields } from './offeredCourseClassSchedule.constants';
import { OfferedCourseClassScheduleService } from './offeredCourseClassSchedule.service';

const createOfferedCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await OfferedCourseClassScheduleService.createOfferedCourseClassSchedule(
        req.body
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered Course Class Schedule created',
      data: result,
    });
  }
);

const getOfferedCourseClassSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, offeredCourseClassScheduleFiltarableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await OfferedCourseClassScheduleService.getAllFromDB(
      filters,
      options
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered Course Class Schedule fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const OfferedCourseClassScheduleController = {
  createOfferedCourseClassSchedule,
  getOfferedCourseClassSchedule,
};
