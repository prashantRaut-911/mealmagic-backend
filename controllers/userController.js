
const User = require('../models/userModel');


exports.getAllUsers = async (req,res)=>{
    try {
          
      const users  = await User.find();
      if(!users.length){
          return res.status(404).json({message : 'No user registered' , error : true});
      }
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({
          message : error.message,
          error : true
      })
  }
  }
  
  exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user)
        return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });
    }
  };
  
  exports.updateUser = async (req, res) => {
    try {
      const { username, email, role } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { username, email, role },
        { new: true }
      );
      if (!updatedUser)
        return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  };
  
  exports.deleteUser = async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser)
        return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  };
  
