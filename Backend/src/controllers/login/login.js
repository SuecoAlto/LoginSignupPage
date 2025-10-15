import crypto from 'crypto';
import sendEmail from '../../utils/email.js';

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

  // Remove password from user object before sending
  const userWithoutPassword = { ...user._doc };
  delete userWithoutPassword.password;

  res
    .status(statusCode)
    .cookie('token', token, cookieOptions) // Set token as a cookie
    .json({
      success: true,
      user: userWithoutPassword, // ADD USER DATA HERE
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


// @desc    Glömt lösenord
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
  // 1. Hitta användaren baserat på e-post
  const user = await User.findOne({ email: req.body.email });

  // Om ingen användare hittas, skicka ett framgångsmeddelande ändå för att inte avslöja vilka e-postadresser som finns i systemet.
  if (!user) {
    return res.status(200).json({ success: true, data: 'Email sent' });
  }

  // 2. Generera en slumpmässig återställningstoken
  const resetToken = crypto.randomBytes(20).toString('hex');

  // 3. Hasha token och spara den i databasen
  user.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // 4. Sätt en utgångstid (10 minuter)
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  // 5. Skapa återställnings-URL för e-postmeddelandet
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;
  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Click this link to reset your password: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.error(err);
    // Om mejlet misslyckas, rensa token från databasen
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({ error: 'Email could not be sent' });
  }
};



// @desc    Återställ lösenord
// @route   PUT /api/auth/reset-password/:resetToken
// @access  Public
export const resetPassword = async (req, res, next) => {
  try {
    // 1. Hasha token från URL:en för att kunna jämföra med den i databasen
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    // 2. Hitta användaren baserat på den hashade tokenen och se till att den inte har gått ut
    const user = await User.findOne({
      passwordResetToken: resetPasswordToken,
      passwordResetExpires: { $gt: Date.now() }, // $gt = "greater than"
    });

    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid or expired token' });
    }

    // 3. Sätt det nya lösenordet
    user.password = req.body.password;
    // Rensa återställningsfälten
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ success: true, data: 'Password reset successful' });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
