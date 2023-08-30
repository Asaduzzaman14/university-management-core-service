import express from 'express';
import { OfferedCourseClassScheduleController } from './offeredCourseClassSchedule.controller';

const router = express.Router();

router.post(
  '/',
  OfferedCourseClassScheduleController.createOfferedCourseClassSchedule
);

export const OfferedCourseClassScheduleRoutes = router;
