const express = require('express');
const router = express.Router();
const Dish = require('../models/dish');
const orderController = require('../controllers/orderController');

// Routes
router.post('/add', orderController.addOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.get('/user/:userId', orderController.getOrdersByUserId);
router.put('/:id', orderController.updateOrder);
router.put('/:id/status', orderController.updateOrderStatus);
router.delete('/:id', orderController.deleteOrder);


module.exports = router;
