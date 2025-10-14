import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({debug: true});

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
	throw new Error('MONGO_URI is not defined in environment variables');
}

export const connectDB = async () => {
	try {
		await mongoose.connect(mongoURI);
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('MongoDB connection error:', error);
		process.exit(1); // Exit process with failure
	};
};


