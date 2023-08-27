import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { semesterRegistrationFilterableFields } from './semesterRegistration.constants';
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

const getAllRegistrationSemester = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, semesterRegistrationFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await SemesterRegistrationService.getAllRegisterSemester(
      filters,
      options
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SemesterRegistrations fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await SemesterRegistrationService.updateData(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semester registration Updated success',
      data: result,
    });
  }
);

export const SemesterRegistrationController = {
  insertInToDb,
  getAllRegistrationSemester,
  updateSemesterRegistration,
};
