import express from 'express';
import { OfferedCourseClassScheduleController } from './offeredCourseClassSchedule.controller';

const router = express.Router();

router.post(
  '/',
  OfferedCourseClassScheduleController.createOfferedCourseClassSchedule
);

router.get(
  '/',
  OfferedCourseClassScheduleController.getOfferedCourseClassSchedule
);

export const OfferedCourseClassScheduleRoutes = router;
