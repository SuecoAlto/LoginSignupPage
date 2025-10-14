import User from '../../models/User.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    // Get name, email, phone, and password from the request body
    const { name, email, phone, password } = req.body;

    // Check if a user with the same email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      // If the user exists, send an error message
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    // Create a new user in the database
    // Note: The password is automatically hashed thanks to our pre-save hook in User.js!
    const user = await User.create({
      name,
      email,
      phone,
      password,
    });

    // Send a success response
    res.status(201).json({ success: true, data: user });

  } catch (error) {
    // Send an error message if something goes wrong
    res.status(500).json({ success: false, error: error.message });
  }
};

