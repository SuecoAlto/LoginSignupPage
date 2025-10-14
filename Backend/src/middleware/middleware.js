// Backend/src/middleware/middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    try {
      // Verify token from cookie
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

      // Get user from database (without password) and add to req object
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Continue to next function (the controller)
    } catch (error) {
      console.error(error);
      return res.status(401).json({ success: false, error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized, no token' });
  }
};


