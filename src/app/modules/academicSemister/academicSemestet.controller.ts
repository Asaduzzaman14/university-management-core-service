import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemisterFilterAbleFeild } from './academicSemester.constance';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.createSemester(req.body);

  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created',
    data: result,
  });
});

const getSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AcademicSemisterFilterAbleFeild);
  const options = pick(req.query, ['limit', 'page', 'sortOrder', 'sortBy']);

  const result = await AcademicSemesterService.getAllSemester(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic Semester',
    data: result.data,
  });
});

const getSemestersById = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.getSemesterById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester',
    data: result,
  });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicSemesterService.updateOneInDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semster updated successfully',
    data: result,
  });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicSemesterService.deleteByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semster delete successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getSemesters,
  getSemestersById,
  updateOneInDB,
  deleteByIdFromDB,
};
