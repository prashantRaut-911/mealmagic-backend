const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({
    dishName : {
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    cuisine : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    availability : {
        type : Boolean,
        default : true
    },
    coverImage : {
         filename : String,
         path : String,
         size : Number,
         mimetype : String
    },
    stockQuantity :{
            type : Number,
            required : true
    }, 

    rating : String, 



},{timestamps : true} )

module.exports = mongoose.model("Dish",dishSchema);