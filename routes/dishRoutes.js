const router = require('express').Router();

const { getAllDishes, addDish, deleteDish, getDishById, updateDish ,updatedDishStock} = require('../controllers/dishController');
const { upload } = require('../utils/multer');
router.post('/', upload.single('coverImage'), addDish)
router.get('/', getAllDishes);
router.delete('/:id', deleteDish)
router.get('/dish/getDishById/:id', getDishById);
router.put('/dish/updateDish/:id', upload.single('coverImage'), updateDish);
router.patch( '/dish/updateStock/:id', updatedDishStock)

module.exports = router;