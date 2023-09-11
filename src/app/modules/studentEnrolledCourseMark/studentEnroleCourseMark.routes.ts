import express from 'express';
import { StudentEnroleCourseMarkController } from './studentEnroleCourse.controller';

const router = express.Router();

router.patch(
  '/update-mark',
  StudentEnroleCourseMarkController.updateStudentMarks
);

export const StudentEnroleCourseMarks = router;
