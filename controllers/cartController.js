const Cart = require('../models/cart');
const Order = require('../models/order');
const Dish = require('../models/dish');



// const addToCart = async(req,res)=> {
//     try {
//         const {userId , dishId , quantity} = req.body;
//         if(!userId || !dishId){
//             return res.status(400).json({message : 'User Id and Dish Id are required'});
//         }
//         let cart = await Cart.findOne({userId});
//         if(!cart){
//             cart = new Cart({userId , items: []});
//         }

//         const itemIndex = cart.items.findIndex(
//             (item)=> item.dishId.toString() === dishId
//         );
//         if(itemIndex > -1){
//             cart.items[itemIndex].quantity += quantity || 1;
            
//         }else {
//             cart.items.push({dishId , quantity  : quantity || 1});
//         }

//         await cart.save();
//         return res.status(201).json(cart);
//     } catch (error) {
//         return res.status(500).json({message : 'Internal server error'});
//     }

// }


const addToCart = async (req, res) => {
    try {
      const { userId, dishId, quantity } = req.body;
  
    
      if (!userId || !dishId) {
        return res.status(400).json({ message: 'User ID and Dish ID are required.' });
      }
  
     
      const dish = await Dish.findById(dishId);
      if (!dish) {
        return res.status(404).json({ message: `Dish not found: ${dishId}` });
      }
  
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
 
      const itemIndex = cart.items.findIndex(
        (item) => item.dishId.toString() === dishId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        cart.items.push({ dishId, quantity: quantity || 1 });
      }
  
      await cart.save();
      const populatedCart = await cart.populate('items.dishId');
      populatedCart.items = populatedCart.items.filter((item)=> item.dishId !== null);
  
      await populatedCart.save();
      res.status(200).json({ message: 'Item added to cart', cart: populatedCart });
    } catch (error) {
      console.error('Add to cart error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
const getCartByUser= async(req,res)=>{
    try {
        const {userId} = req.params;
        console.log({userId});
        const cart = await Cart.findOne({userId})
        .populate('items.dishId' , 'dishName price coverImage stockQuantity');
        if(!cart){
            return res.status(200).json({message : 'Cart is empty',items  :[]});
        }
        res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({message : 'Internal server error'});
    }
}
const updateCartItem=async(req,res)=>{
    try {
        const {userId , dishId , quantity} = req.body;
        const cart = await Cart.findOne({userId});
        if(!cart) return res.status(404).json({message : 'Cart not found'});

        const item = cart.items.find((i) => i.dishId.toString() === dishId);

        if(!item) return res.status(404).json({message : 'Item not found in cart'});

        item.quantity = quantity;
        await cart.save();

        res.status(200).json({message : 'Cart updated' , cart});
    } catch (error) {
        return res.status(500).json({message : 'Internal server error'});
    }
}
const removeFromCart =async(req,res)=>{
    try {
        const {userId,dishId} = req.body;
        const cart = await Cart.findOne({userId});
        if(!cart) return res.status(404).json({message : 'Cart not found' });
        cart.items = cart.items.filter((i)=> 
        i.dishId.toString() !== dishId
        );

        await cart.save();
        res.status(200).json({message : 'Item removed',cart});
        
    } catch (error) {
        return res.status(500).json({message : 'Internal server error'});
    }
}
const clearCart=async(req,res)=>{
    try {
        const {userId} = req.body;
        await Cart.findByIdAndDelete({userId},{items : []});
        res.status(200).json({messae : 'Cart cleared'});
        
    } catch (error) {
        return res.status(500).json({message : 'Internal server error'});
    }
}


module.exports = {addToCart,getCartByUser,updateCartItem,removeFromCart,clearCart}