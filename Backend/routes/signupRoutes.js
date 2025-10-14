
import express from 'express';

import { register } from '../controllers/signup/signup.js';
import { login } from '../controllers/login/login.js';


const router = express.Router();


// Define a POST route for /register
router.post('/register', register);
router.post('/login', login);


export default router;

