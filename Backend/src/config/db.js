import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({debug: true});

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
	throw new Error('MONGO_URI is not defined in environment variables');
}

export const connectDB = async () => {
	try {
		// Add 'return' here to return the connection
		return await mongoose.connect(mongoURI);
	} catch (error) {
		console.error('MongoDB connection error:', error);
		throw error; // Throw error instead of process.exit to let caller handle it
	};
};


