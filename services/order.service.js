
const mongoose = require('mongoose');
const Order = require('../models/order');
const Dish = require('../models/dish');

exports.createOrderWithTransaction = async (orderData) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { user, shippingAddress, billingAddress, orderItems } = orderData;
    let totalAmount = 0;

    // Loop through items and adjust stock safely
    for (const item of orderItems) {
      const dish = await Dish.findById(item.dishId).session(session);

      if (!dish) throw new Error(`Dish not found: ${item.dishId}`);
      if (dish.stockQuantity < item.quantity)
        throw new Error(`Not enough stock for ${dish.dishName}`);

      dish.stockQuantity -= item.quantity;
      await dish.save({ session });
      totalAmount += dish.price * item.quantity;
    }

    // Create order atomically
    const order = new Order({
      user,
      shippingAddress,
      billingAddress,
      totalAmount,
      orderStatus: 'Pending',
      orderItems: orderItems.map(i => ({
        orders: i.dishId,
        quantity: i.quantity,
      })),
    });

    const savedOrder = await order.save({ session });
    await session.commitTransaction();
    session.endSession();

    return savedOrder;

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error; // Pass error to controller
  }
};