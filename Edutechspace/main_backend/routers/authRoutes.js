import express from 'express';
import { login, signup,generateToken, logout } from '../Controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/generate-token', generateToken);
router.post('/logout', logout);

export default router;