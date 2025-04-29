import express from 'express';
import { login, signup, googleLogin, logout } from '../Controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/google', googleLogin);
router.post('/logout', logout);

export default router;