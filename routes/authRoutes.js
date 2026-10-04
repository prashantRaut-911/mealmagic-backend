const express = require('express');
const router = express.Router();
const { signup, login , resetPassword, sendOtp} = require('../controllers/authController');


router.post('/signup', signup);


router.post('/login', login);


router.post('/sendOtp', sendOtp);
router.post('/resetPassword', resetPassword);

module.exports = router;
