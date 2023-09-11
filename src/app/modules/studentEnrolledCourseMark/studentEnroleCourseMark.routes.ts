import express from 'express';
import { StudentEnroleCourseMarkController } from './studentEnroleCourse.controller';

const router = express.Router();

router.patch(
  '/update-mark',
  StudentEnroleCourseMarkController.updateStudentMarks
);

router.patch(
  '/update-final-marks',
  StudentEnroleCourseMarkController.updateFinalMarks
);

export const StudentEnroleCourseMarks = router;
