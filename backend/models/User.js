const mongoose = require('mongoose');

// Define User schema with role field
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Manager', 'Attendee'], default: 'Attendee' } // Default role is Attendee
});

module.exports = mongoose.model('User', userSchema);
