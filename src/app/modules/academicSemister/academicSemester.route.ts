import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemestet.controller';

const route = express.Router();

route.post(
  '/',
  validateRequest(AcademicSemesterValidation.create),
  AcademicSemesterController.createSemester
);

route.get('/:id', AcademicSemesterController.getSemestersById);
route.get('/', AcademicSemesterController.getSemesters);

export const AcademicSemesterRoutes = route;
