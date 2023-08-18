import express from 'express';
import { AcademicSemesterController } from './academicSemestet.controller';

const route = express.Router();

route.post('/', AcademicSemesterController.createSemester);

export const AcademicSemesterRoutes = route;
