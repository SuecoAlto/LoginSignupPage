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
const port = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'https://loginsignuppage-9ztx.onrender.com' // Lägg till din live-URL här
];

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
})); 
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  // Sätt den statiska mappen för frontend-bygget
  app.use(express.static(path.join(__dirname, '../../Frontend/dist')));

  // Servera index.html för alla andra routes
  app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, '../../', 'Frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Mount routes
app.use('/api/auth', routes);


// Start Express server
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

// MongoDB connection
connectDB();
