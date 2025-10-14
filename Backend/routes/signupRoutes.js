
import express from 'express';

import { register } from '../controllers/signup/signup.js';


const router = express.Router();


// Define a POST route for /register
router.post('/register', register);


export default router;

