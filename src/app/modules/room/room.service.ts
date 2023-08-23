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

const getRoomById = async (id: string): Promise<Room | null> => {
  const result = await prisma.room.findUnique({
    where: { id },
  });

  return result;
};

const updateRoomById = async (
  id: string,
  payload: Partial<Room>
): Promise<Room> => {
  const result = await prisma.room.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteRoomById = async (id: string): Promise<Room> => {
  const result = await prisma.room.delete({
    where: {
      id,
    },
  });
  return result;
};

export const RoomServices = {
  createRooms,
  getRoomById,
  updateRoomById,
  deleteRoomById,
};
