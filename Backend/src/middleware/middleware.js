// Backend/src/middleware/middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const token = req.cookies.token; // Get token directly

  if (token) { // If a token exists...
    try {
      // Verify token from cookie
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database and add to req object
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Continue to controller
    } catch (error) {
      console.error(error);
      return res.status(401).json({ success: false, error: 'Not authorized, token failed' });
    }
  } else { // Otherwise, if no token exists...
    return res.status(401).json({ success: false, error: 'Not authorized, no token' });
  }
};


