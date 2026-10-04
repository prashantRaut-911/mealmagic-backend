const { log } = require('console');
const {userData,validateEmail} = require('../models/userModel');
const {generateToken} = require('../utils/jwtUtils') 
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const userFilePath = path.join(__dirname, '..', 'usersData.json');
console.log(userFilePath);
let users = [];
const register_fs = async (req,res) => {
   
    try {
        // const data = fs.readFileSync(userFilePath,'utf-8');
    // const data = fs.readFileSync(userFilePath,'utf-8');
    // users = JSON.parse(data);

    const {id,username,email,mobileNumber,password,userRole} = req.body;
    if(!validateEmail(email)){
        return res.status(400).json({message : 'Invalid email format'});
    }
    // const userExists = users.some(user=> user.email === email);
    // if(userExists){
    //    return res.status(400).json({message : 'user with same email already exists'})
    // }

    const user  = await User(req.body).save();
    if(user){
        console.log("User added in DB");
    }
    // const newUser = { id: users.length>0? users[users.length - 1].id + 1 : 1,
    //                     username,email,mobileNumber,password,userRole};
    // users.push(newUser);
    // fs.writeFileSync(userFilePath,JSON.stringify(users,null,2),'utf-8');
    // console.log('data writeen successfully',users);
    return res.status(201).json({
        error : false,
        message : "user register successfully"
    });
    } catch (error) {
        return res.status(500).json({
            error : true,
            message : error.message
        });
    }

}

const login_fs = async (req,res) => {
   try {
    // const data = fs.readFileSync(userFilePath,'utf-8');
    // const users = JSON.parse(data);
    const{email,password} = req.body;
    
    // const user = users.find(u => u.email === email );
    const existUser = await User.findOne({email});
    console.log(existUser.username);
    if(!existUser){
        return res.status(404).json({message : 'User not found'})
    }

    const token = generateToken(existUser._id);

    if(existUser.password === password){
         res.status(200).json({
            error : false,
            user : existUser.username,
            message : "Login successfull",email,
            token
            });
    }
    res.status(404).json({
        message : 'Invalid details',
        error : true
    })
    // console.log(user);
    // if(!user){
    //     console.log('User not found');
    // }
    
    // if(user.password === password){
    //     console.log('Login successs');
    //     const token = generateToken(user.id);
    //     return res.status(200).json({
    //     error : false,
    //     message : "Login successfull",email,token
    //     });
    // }
   } catch (error) {
    console.log(error);
    res.status(404).json({error: true, message : 'User not found '})
   }
     

    
}  

const getAllUsers_fs = async (req,res) => {
    try {
        
        const users  = await User.find();
        if(!users.length){
            return res.status(404).json({message : 'No user registered' , error : true});
        }
        res.status(200).json({
            message : 'Get Users succesfully',
            error : false,
            users
        })
    } catch (error) {
        res.status(500).json({
            message : error.message,
            error : true
        })
    }
}

const findByEmail = async (req,res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message : 'No user registered' , error : true});
        }
        res.status(200).json({
            message : 'Email is Verify',
            error : false,
            user
        })
    } catch (error) {
        res.status(500).json({
            message : error.message,
            error : true
        })
    }
}





module.exports = {register_fs,login_fs ,getAllUsers_fs, findByEmail };












// const fs = require('fs');
// const path = require('path');
// const userFilePath = path.join(__dirname, '..', 'usersData.json');

// let usersData = [];

// try {
//     if (!fs.existsSync(userFilePath)) {
//         const raw = fs.readFileSync(userFilePath, 'utf-8');
//         const parsed = JSON.parse(raw);
//         if (Array.isArray(parsed)) {
//             usersData = parsed;
//         }
//         else {
//             usersData = [];
//         }
//     }
//     else {
//         fs.writeFileSync(userFilePath, JSON.stringify(usersData, null, 2), 'utf8');
//     }
// }
// catch (error) {
//     console.log('Error loading usersData.json', error);
//     usersData = [];
// }

// const saveUsesToFile = () => {
//     fs.writeFileSync(userFilePath, JSON.stringify(usersData, null, 2), 'utf-8');
// }








// //Functions:
// const register_fs = (req, res) => {
//     try {
//         const { username, email, mobileNumber, password, userRole } = req.body || {};

//         if (!username || !email || !mobileNumber || !password || !userRole) {
//             return res.status(400);

//             // Remaining logic 
//         }

//         res.status(201).json({ message: 'user registered successfully' })
//         // Remaining logic 
//     } catch (error) {
//         console.log('register_fs_error:', err);
//         res.status(500)
//     }
// }
// const login_fs = (req, res) => {
//     try {
//         let { email, password } = req.body || {};
//         if (!email || !password) {
//             return res.status(400).json({ message: "Email and Password are required" })
//         }
//         // KING LINE
//         email = decodeURIComponent(email);

//         const user = usersData.find((u) => u.email.toLowerCase() === email.toLowerCase());

//         if (!user) {
//             return res.status(401).json({ message: 'Invalid credentials' });

//         }

//         if (user.password !== password) {
//             return res.status(401).json({ message: "Invalid credentials" })
//         }

//         return res.status(200).json({ message: "Login successful" });
//     }
//     catch (error) {
//         console.log('login_fs error', err);
//         return res.status(500).json({ message: "Internal server error" })
//     }
// }
// const resetPassword_fs = (req, res) => {
//     try {
//         let { email, newPassword } = req.body || {};
//         if (!email || !newPassword) {
//             return res.status(400).json({ message: "email and newPassword required." })
//         }
//         email = decodeURIComponent(email);
//         const userIndex = usersData.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());

//         if (userIndex === -1) {
//             return res.status(404).json({ message: "User not found" });

//         }

//         usersData[userIndex].password = newPassword;
//         saveUsesToFile();
//         return res.status(200).json({ message: "password reset successfully" });


//     } catch (error) {

//         console.log('resetPassword_err_fs:', err);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }
// const getAllUsers_fs = (req, res) => {
//     try {
//         const userNoPassword = usersData.map(({ password, ...rest }) => {
//             rest
//         });
//         return res.status(200).json({ message: "All users fetch successfully" });

//     }
//     catch (error) {
//         console.log('getAllUsers_fs error: ', error);
//         return res.status(500).json({ message: error.message });
//     }
// }


// const addUser = () =>{}
// const getUserByEmailAndPassword = () => {}

// module.exports = { 
//     addUser,
//     getUserByEmailAndPassword, 
//     register_fs, 
//     login_fs, 
//     resetPassword_fs,
//      getAllUsers_fs };
