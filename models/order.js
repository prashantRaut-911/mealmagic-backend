const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderDate : {
        type : Date,
        default: Date.now,
    },
    orderStatus : {
        type : String,
        required : [true, 'Must be one of the values'],
        enum : ['Pending','Processing','Shipped','Delivered','Cancelled']
    },
    shippingAddress  : {
        type : String,
        required :true
    },
    billingAddress  :{
        type :String,
        required : true
    },
    totalAmount : {
        type : Number,
        required : true,
        min : 0
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    orderItems :[
        {
            orders : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Dish'
            },
            quantity : {
                type : Number,
                required : true,
                default : 1
            }
        }
    ]
},{timestamps : true});

module.exports = mongoose.model('Order',orderSchema);