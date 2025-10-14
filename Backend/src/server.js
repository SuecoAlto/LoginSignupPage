import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db.js';

import routes from './routes/routes.js';

dotenv.config({ debug: true });

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({origin: 'http://localhost:5173', credentials: true})); // Enable CORS for all routes 
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

// Mount routes
app.use('/api/auth', routes);


// Start Express server
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

// MongoDB connection
connectDB();
