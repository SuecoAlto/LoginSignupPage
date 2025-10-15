import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';

import routes from './routes/routes.js';

dotenv.config({ debug: true });

const app = express();
const port = process.env.PORT || 5001;

// --- CORS SOLUTION ---
// Define CORS settings in a separate object
const allowedOrigins = [
  'http://localhost:5173',
  'https://loginsignuppage-9ztx.onrender.com' // Make sure this is your correct Render URL
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests without origin (like Postman) or if origin is in our list
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

// Handle pre-flight requests for ALL routes first
app.options('*', cors(corsOptions));

// Then use cors for all other requests
app.use(cors(corsOptions));
// --- END OF CORS SOLUTION --- 



app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

// 1. MOUNT API ROUTES FIRST
app.use('/api/auth', routes);

// 2. HANDLE STATIC FILES AND CATCH-ALL AFTERWARDS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  // Set static folder for frontend build
  app.use(express.static(path.join(__dirname, '../../Frontend/dist')));

  // Serve index.html for all other routes
  app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, '../../', 'Frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Start server with proper database connection handling
const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected successfully');
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to connect to DB, server not started', error);
    process.exit(1);
  }
};

startServer();
