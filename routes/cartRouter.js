const router = require('express').Router();
const cartController = require('../controllers/cartController');


router.post('/add',cartController.addToCart);
router.get('/:userId',cartController.getCartByUser);
router.patch('/update',cartController.updateCartItem);
router.delete('/remove',cartController.removeFromCart);
router.post('/clear',cartController.clearCart);

module.exports = router;