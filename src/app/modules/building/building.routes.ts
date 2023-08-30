import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { buildingController } from './building.controller';
import { BuildingValidations } from './building.validation';

const router = express();

router.get('/:id', buildingController.getBuildingById);
router.get('/', buildingController.getAllBuilding);

router.post(
  '/',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(BuildingValidations.create),
  buildingController.createBuilding
);

router.patch(
  '/:id',
  validateRequest(BuildingValidations.update),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  buildingController.updateOneInDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  buildingController.deleteByIdFromDB
);

export const BuildingRoutes = router;
