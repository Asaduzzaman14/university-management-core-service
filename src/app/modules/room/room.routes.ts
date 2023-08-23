import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { RoomsController } from './room.controller';
const router = express();

router.get('/:id', RoomsController.getRoomsgById);
// router.get('/', RoomsController.getAllBuildin);

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  RoomsController.createRooms
);

router.patch(
  '/:id',

  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  RoomsController.updateOneInDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  RoomsController.deleteRoomByIdFromDB
);

export const RoomRoutes = router;
