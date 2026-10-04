const Dish = require('../models/dish');

const getAllDishes = async(req,res) => {
    try {

        console.log("Get the data");
        // const { searchValue = 'createdAt',sortOrder,sortValue} = req.query;
        // const dishes = await Dish.find(searchValue).sort({[sortValue]: sortOrder});
        console.log(`${req.method} - ${Date.now()}`);
        
        const dishes = await Dish.find();
        
        res.status(200).json({
            message : "Get all Dishes successfully",
            error : false,
            dishes
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({message : error.message});   
    }
}
const getDishById = async(req,res) => {
    try {
       

        const dish = await Dish.findById(req.params.id);
        res.status(200).json(dish);
    } catch (error) {
        res.status(500).json({message : error.message});   
    }
}

const addDish =async (req,res)=> {
    try {
        const{ dishName,description,cuisine,price,availability, stockQuantity} = req.body;
        console.log("data recieve");
        const file = req.file;
        if(!file){
            res.status(400).json({message : 'No file uplaoded'});
        }
        console.log(file);

        const newDish = new Dish({ dishName,description,cuisine,price,
            availability,
            coverImage : {
                filename:  file.filename,
                path: file.path,
                size: file.size,
                mimetype : file.mimetype
            }, stockQuantity
        });
        await newDish.save();
        // const dishes = await Dish.create(req.body);
        // console.log(dishes);
        
        res.status(201).json({
            message : 'Dish Added Successfully',
            error : true,
            newDish
        });
    } catch (error) {
        res.status(500).json({message : error.message});   
    }
}

const updateDish = async(req,res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const updatedDish = await Dish.findByIdAndUpdate(id,updateData,{new : true});
        res.status(200).json({message: 'Dish Updated Successfully',dish: updatedDish});
    } catch (error) {
        res.status(500).json({message : error.message});   
    }
}

const updatedDishStock = async (req, res) => {
   
try {
    const { id } = req.params;
    const { stockQuantity } = req.body;

    if (stockQuantity < 0) {
      return res.status(400).json({
        message: 'Stock quantity cannot be negative',
        error: true
      });
    }

    const updatedDish = await Dish.findByIdAndUpdate(
      id,
      { stockQuantity },
      { new: true, runValidators: true }
    );

    if (!updatedDish) {
      return res.status(404).json({
        message: 'Dish not found',
        error: true
      });
    }

    res.status(200).json({
      message: 'Stock updated successfully',
      error: false,
      dish: updatedDish
    });
  } catch (err) {
    console.error('Error updating stock:', err);
    res.status(500).json({
      message: 'Server error while updating stock',
      error: true
    });
  }

}

const deleteDish = async(req,res) => {
    try {
        await Dish.findByIdAndDelete(req.params.id);
        res.status(200).json({message :'Dish Deleted Successfully'});
    } catch (error) {
        res.status(500).json({message : error.message});   
    }
}

module.exports = {
    getAllDishes,
    getDishById,
    addDish,
    updateDish,
    deleteDish,
    updatedDishStock }