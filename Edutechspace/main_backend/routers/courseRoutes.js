import express from 'express';
import { getCourseProgress, getCourses } from '../Controllers/courseController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/progress/:userId', protect, getCourseProgress);
router.get('/list', getCourses);
// router.post('/upload', authMiddleware, uploadResource);

export default router;