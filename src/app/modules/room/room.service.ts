import { Room } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createRooms = async (data: Room): Promise<Room> => {
  const result = await prisma.room.create({
    data,
    include: {
      building: true,
    },
  });
  return result;
};

export const RoomServices = {
  createRooms,
};
