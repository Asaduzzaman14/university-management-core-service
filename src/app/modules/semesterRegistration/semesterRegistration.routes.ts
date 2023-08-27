import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post('/', SemesterRegistrationController.insertInToDb);

export const SemesterRegiRoutes = router;
