import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidation } from './semesterRegister.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.get(
  '/get-my-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.getMyRegistration
);

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

router.post(
  '/enrole-into-course',
  validateRequest(SemesterRegistrationValidation.enroleOrWithDrowCourse),
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.inroleInToCourse
);

router.post(
  '/withdrow-from-course',
  validateRequest(SemesterRegistrationValidation.enroleOrWithDrowCourse),
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.withDrowFromCourse
);

router.post(
  '/confirm-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.confirmRegistration
);

export const SemesterRegiRoutes = router;
