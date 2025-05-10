import express from "express";
import {
  enrollUserInCourse,
  getCourses,
  getUserEnrolledCourses,
} from "../Controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get('/progress/:userId', protect, getCourseProgress);
router.get("/list", getCourses);
router.post("/enroll", protect, enrollUserInCourse);
router.get("/enrolled", protect, getUserEnrolledCourses)
// router.post('/upload', authMiddleware, uploadResource);

export default router;
