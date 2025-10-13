import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config({ debug: true });

const app = express();
const port = process.env.PORT || 5000;

// Express
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

//Mongodb connection
connectDB();
