
import express from 'express';

import { register } from '../controllers/signup/signup.js';
import { login, logout } from '../controllers/login/login.js';
import { protect } from '../middleware/middleware.js';
import { getProfile } from '../controllers/login/userController.js';
import { forgotPassword, resetPassword } from '../controllers/login/login.js';

const router = express.Router();


// Define a POST route for /register
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', protect, getProfile);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);


export default router;

