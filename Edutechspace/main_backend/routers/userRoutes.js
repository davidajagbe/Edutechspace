import express from 'express';
import {getProfile, updateProfile, deleteProfile} from '../Controllers/userController.js';;

const router = express.Router();
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.delete('/profile', deleteProfile);

export default router