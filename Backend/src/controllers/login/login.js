import jwt from 'jsonwebtoken';

import User from '../../models/User.js';


// Helper function to sign a JWT and send a response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d', // Token is valid for 1 day
  });

  const cookieOptions = {
    // To make it a session cookie, omit 'expires' and 'maxAge'
    httpOnly: true, // Cookie cannot be accessed via JavaScript on the client (protects against XSS)
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
  };

  res
    .status(statusCode)
    .cookie('token', token, cookieOptions) // Set token as a cookie
    .json({
      success: true, // Only send a success message
    });
};


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate that email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    // Find the user and explicitly include the password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(404).json({ success: false, error: 'User with that email not found. Would you like to register?' });
    }

    // Compare the submitted password with the hashed one in the database
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'The password you entered is incorrect. Please try again.' });
    }

    // Send token on login
    sendTokenResponse(user, 200, res);

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { sendTokenResponse };

// @desc    Logout user
// @route   GET /api/auth/logout
// @access  Public
export const logout = (req, res, next) => {
  // Set an invalid cookie that expires immediately
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
};
