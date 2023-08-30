import express from 'express';
import { OfferedCourseClassScheduleService } from './offeredCourseClassSchedule.service';

const router = express.Router();

router.post(
  '/',
  OfferedCourseClassScheduleService.createOfferedCourseClassSchedule
);

export const OfferedCourseClassScheduleRoutes = router;
