import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemestet.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AcademicSemesterValidation.create),
  AcademicSemesterController.createSemester
);

router.get('/:id', AcademicSemesterController.getSemestersById);

router.get('/', AcademicSemesterController.getSemesters);

// router.patch('/:id', AcademicSemesterController);

// router.delete('/:id', AcademicSemesterController);

export const AcademicSemesterRoutes = router;
