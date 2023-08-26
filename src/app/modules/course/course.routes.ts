import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.get('/:id', CourseController.getAllCourses);

router.delete('/:id', CourseController.deleteCourse);

router.get('/', CourseController.getAllCourses);

router.post(
  '/',
  validateRequest(CourseValidation.create),
  CourseController.createCourse
);

router.patch(
  '/:id',
  validateRequest(CourseValidation.update),
  CourseController.updateCourseById
);

export const CourseRoutes = router;
