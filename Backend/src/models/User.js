import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'], // This field is required
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true, // Each email address must be unique in the database
    match: [ // Uses a regular expression to validate the email format
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    match: [
      /^(\+46|0)7[0-9]{8}$/, // Swedish mobile number format
      'Please provide a valid Swedish phone number',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6, // The password must be at least 6 characters long
    select: false, // This field will not be returned in normal database queries
  },

  passwordResetToken: String,
  passwordResetExpires: Date,

});

// Middleware that runs BEFORE a user is saved to the database
userSchema.pre('save', async function (next) {
  // If the password has not been modified, move on to the next middleware
  if (!this.isModified('password')) {
    next();
  }

  // Generate a "salt" and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare the entered password with the hashed one in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;

