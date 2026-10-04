 const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendMail } = require('../utils/mailer');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';


exports.signup = async (req, res) => {
  try {
    const { username, email, password, role,mobileNumber } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({mobileNumber, username, email, password: hashed, role: role || 'User' });

    const safeUser = { _id: user._id, username: user.username, email: user.email, role: user.role ,mobileNumber : user.mobileNumber };
    res.status(201).json({ message: 'User created successfully', user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const payload = { sub: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    const safeUser = { _id: user._id, username: user.username, email: user.email, role: user.role , mobileNumber : user.mobileNumber};

    res.json({
      message: 'Login successful',
      token,
      user: safeUser,
      expiresIn: JWT_EXPIRES_IN
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    const html = `
      <div style="font-family:sans-serif;">
        <h3>🔐 Meal Magic Password Reset</h3>
        <p>Your OTP for password reset is:</p>
        <h2 style="color:#ff6600;">${otp}</h2>
        <p>This code will expire in <b>5 minutes</b>.</p>
      </div>
    `;

    await sendMail(email, 'Meal Magic Password Reset Code', html);

    res.json({ message: 'OTP sent successfully to email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    if (user.otp !== otp || Date.now() > user.otpExpires)
      return res.status(400).json({ message: 'Invalid or expired OTP' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to reset password' });
  }
};
