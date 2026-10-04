const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: false },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // hashed
  mobileNumber : {type : String , required : true},
  role: { type: String, enum: ['User', 'Admin'], default: 'User' },
  otp : String,
  otpExpires : Date 
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);