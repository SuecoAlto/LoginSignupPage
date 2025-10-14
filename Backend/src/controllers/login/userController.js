


// @desc    Get logged in user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = (req, res, next) => {
  // req.user is available here thanks to our protect middleware
  res.status(200).json({
    success: true,
    data: req.user,
  });
};