import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidation } from './semesterRegister.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.get('/:id', SemesterRegistrationController.getregisterSemesterById);
router.get('/', SemesterRegistrationController.getAllRegistrationSemester);

router.post(
  '/',
  validateRequest(SemesterRegistrationValidation.create),
  SemesterRegistrationController.insertInToDb
);

router.patch(
  '/:id',
  validateRequest(SemesterRegistrationValidation.update),
  SemesterRegistrationController.updateSemesterRegistration
);

router.delete('/:id', SemesterRegistrationController.deleteByIdFromDB);

export const SemesterRegiRoutes = router;
