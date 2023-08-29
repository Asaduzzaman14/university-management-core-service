import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OffetedCourseController } from './offeredCourse.controller';
import { Validations } from './offeredCourse.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(Validations.create),
  OffetedCourseController.createOfferedCourse
);

export const OfferedCourseRoutes = router;
