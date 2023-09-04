import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseClassScheduleController } from './offeredCourseClassSchedule.controller';
import { OfferedCourseClassScheduleValidation } from './offeredCourseClassSchedule.validations';

const router = express.Router();

router.post(
  '/',
  OfferedCourseClassScheduleController.createOfferedCourseClassSchedule
);

router.get(
  '/',
  OfferedCourseClassScheduleController.getOfferedCourseClassSchedule
);
router.get('/:id', OfferedCourseClassScheduleController.getByIdFromDB);

router.patch(
  '/:id',
  validateRequest(OfferedCourseClassScheduleValidation.update),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseClassScheduleController.updateOneInDB
);

router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCourseClassScheduleController.deleteByIdFromDB
);

export const OfferedCourseClassScheduleRoutes = router;
