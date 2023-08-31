import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
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

// student_semester_registrations
router.post(
  '/start-my-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.startMyRegistration
);

export const SemesterRegiRoutes = router;
