
const router  = require('express').Router();
const{getAllUsers,getUserById,updateUser} = require('../controllers/userController');

router.get('/getAllUsers',getAllUsers);
router.get('/:id',getUserById);
router.put('/:id',updateUser);
module.exports = router;

