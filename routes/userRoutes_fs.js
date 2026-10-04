const router = require('express').Router();

const  {register_fs,login_fs ,getAllUsers_fs, findByEmail } = require('../controllers/userController_fs');
// login_fs,resetPassword_fs,getAllUsers_fs

router.post('/registerfs',register_fs);

router.post('/loginfs',login_fs);

router.post('/findByEmail', findByEmail )

// router.put('/reset-password',resetPassword_fs);

router.get('/users',getAllUsers_fs);



// router.get('/user_fs')
module.exports = router;