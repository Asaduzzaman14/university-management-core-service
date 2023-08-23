import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { RoomServices } from './room.service';

const createRooms = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.createRooms(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room created successfully',
    data: result,
  });
});

export const RoomsController = {
  createRooms,
};
