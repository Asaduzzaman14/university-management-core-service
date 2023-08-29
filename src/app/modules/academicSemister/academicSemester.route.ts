import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemestet.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(AcademicSemesterValidation.create),
  AcademicSemesterController.createSemester
);

router.get('/:id', AcademicSemesterController.getSemestersById);

router.get('/', AcademicSemesterController.getSemesters);

// router.patch('/:id', AcademicSemesterController);

// router.delete('/:id', AcademicSemesterController);

export const AcademicSemesterRoutes = router;
