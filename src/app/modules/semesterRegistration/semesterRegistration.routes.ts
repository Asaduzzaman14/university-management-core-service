import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post('/', SemesterRegistrationController.insertInToDb);

router.get('/', SemesterRegistrationController.getAllRegistrationSemester);

router.patch('/', SemesterRegistrationController.updateSemesterRegistration);

export const SemesterRegiRoutes = router;
