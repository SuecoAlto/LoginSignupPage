import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';

import signupRoutes from './routes/signupRoutes.js';

dotenv.config({ debug: true });

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes 
app.use(express.json()); // Parse JSON bodies

// Mount routes
app.use('/api/auth', signupRoutes);


// Express
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

//Mongodb connection
connectDB();
