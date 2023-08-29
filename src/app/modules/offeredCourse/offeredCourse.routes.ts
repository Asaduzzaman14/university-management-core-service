import express from 'express';
import { OffetedCourseController } from './offeredCourse.controller';

const router = express.Router();

router.post('/', OffetedCourseController.createOfferedCourse);

export const OfferedCourseRoutes = router;
