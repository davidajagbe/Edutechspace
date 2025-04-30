import express from 'express';
import { getProfile, updateProfile, deleteProfile } from '../Controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getProfile);  
router.put('/profile', protect, updateProfile);
router.delete('/profile', protect, deleteProfile); 

export default router;