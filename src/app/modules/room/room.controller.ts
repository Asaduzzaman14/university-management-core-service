import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { RoomServices } from './room.service';
import pick from '../../../shared/pick';
import { roomFilterableFields } from './room.constants';

const createRooms = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.createRooms(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, roomFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await RoomServices.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rooms fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getRoomsgById = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.getRoomById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room get Successfully',
    data: result,
  });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoomServices.updateRoomById(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room updated successfully',
    data: result,
  });
});

const deleteRoomByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoomServices.deleteRoomById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room delete successfully',
    data: result,
  });
});

export const RoomsController = {
  createRooms,
  getAllFromDB,
  getRoomsgById,
  updateOneInDB,
  deleteRoomByIdFromDB,
};
