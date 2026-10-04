
const Order = require('../models/order');
const Dish = require('../models/dish');

const addOrder = async (req, res) => {
  try {
    const { user, shippingAddress, billingAddress, orderItems } = req.body;

    if (!user || !orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "User and order items required" });
    }

    // Calculate total
    let totalAmount = 0;
    for (const item of orderItems) {
      const dish = await Dish.findById(item.dishId);
      if (!dish) return res.status(404).json({ message: `Dish not found: ${item.dishId}` });
      totalAmount += dish.price * item.quantity;
    }

    
    const newOrder = new Order({
      user,
      shippingAddress,
      billingAddress,
      totalAmount,
      orderStatus: "Pending",
      orderItems: orderItems.map(i => ({ orders: i.dishId }))
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const addOrder = async (req, res) => {
//   try {
//     const { user, shippingAddress, billingAddress, orderItems } = req.body;

//     if (!user || !orderItems || orderItems.length === 0) {
//       return res.status(400).json({ message: "User and order items required" });
//     }

//     // Calculate total
//     let totalAmount = 0;
//     for (const item of orderItems) {
//       const dish = await Dish.findById(item.dishId);
//       if (!dish) return res.status(404).json({ message: `Dish not found: ${item.dishId}` });
//       if(dish.stockQuantity < item.quantity){
//         return res.status(400).json({message : `Insufficient stock for ${dish.dishName}`});

//       }
//       totalAmount += dish.price * item.quantity;
//     }

    
//     const newOrder = new Order({
//       user,
//       shippingAddress,
//       billingAddress,
//       totalAmount,
//       orderStatus: "Pending",
//       orderItems: orderItems.map(i => ({ orders: i.dishId , quantity : i.quantity }))
//     });

//     await newOrder.save();
//     for(const item of orderItems){
//       await Dish.findByIdAndDelete(item.dishId , {
//         $inc : {stockQuantity : -item.quantity},
//       });
//     }

//     await Cart.findOneAndUpdate({userId : user}, {items : []});
//     res.status(201).json(newOrder);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'username email')
      .populate('orderItems.orders', 'dishName cuisine coverImage price');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'username email')
      .populate('orderItems.orders', 'dishName cuisine coverImage price');

    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders by a specific user
const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate('user', 'username email')
      .populate('orderItems.orders', 'dishName cuisine coverImage price');

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order (status, addresses)
const updateOrderStatus = async (req, res) => {
  try {
    const {status} = req.body

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
     {orderStatus : status},
     {new : true}
    );
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
     {new : true}
    );
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
  updateOrderStatus
};
