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

const getregisterSemesterById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SemesterRegistrationService.getregisterSemesterById(
      id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SemesterRegistration fetched successfully',
      data: result,
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

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.deleteByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SemesterRegistration deleted successfully',
    data: result,
  });
});

// student_semester_registrations model

const startMyRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  console.log(user);
  const result = await SemesterRegistrationService.startMyRegistration(
    user.userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'start My Registration is success',
    data: result,
  });
});

const inroleInToCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  console.log(user);

  const result = await SemesterRegistrationService.enroleIntCourse(
    user.userId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully enrolled',
    data: result,
  });
});

const withDrowFromCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  console.log(user);

  const result = await SemesterRegistrationService.withdrowFromCourse(
    user.userId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully withdrow From Course',
    data: result,
  });
});

const confirmRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  console.log(user);

  const result = await SemesterRegistrationService.confirmRegistration(
    user.userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Confirm Registration success',
    data: result,
  });
});

const getMyRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  console.log(user);

  const result = await SemesterRegistrationService.getMyRegistration(
    user.userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My registration data fatched',
    data: result,
  });
});

const startNewSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.startNewSemester(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Start new Semester',
    data: result,
  });
});

export const SemesterRegistrationController = {
  insertInToDb,
  getAllRegistrationSemester,
  getregisterSemesterById,
  updateSemesterRegistration,
  deleteByIdFromDB,

  startMyRegistration,
  inroleInToCourse,
  withDrowFromCourse,
  confirmRegistration,
  getMyRegistration,
  startNewSemester,
};
