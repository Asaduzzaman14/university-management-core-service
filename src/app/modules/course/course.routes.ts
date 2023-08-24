import express from 'express';
import { CourseController } from './course.controller';

const router = express.Router();

router.get('/:id', CourseController.getAllCourses);

router.delete('/:id', CourseController.deleteCourse);

router.get('/', CourseController.getAllCourses);

router.post('/', CourseController.createCourse);

export const CourseRoutes = router;
