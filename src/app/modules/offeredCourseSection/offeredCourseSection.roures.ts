import express from 'express';
import { OfferedCourseSectionControler } from './offeredCourseSection.controller';

const router = express.Router();

router.post('/', OfferedCourseSectionControler.insertInToDB);

export const OfferedCourseSectionRoutes = router;
