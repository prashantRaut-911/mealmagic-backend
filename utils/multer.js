const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + '-' + file.originalname);
    }
})

 
const upload = multer({
    storage : storage,
    fileFilter: function(req,file,cb){
        const allowTypes = ['image/jpg','image/jpeg','image/png'];
        if(!allowTypes.includes(file.mimetype)){
            const error = new Error('Only JPG and PNG are allowed');
           return cb(error,false);
        }
        cb(null,true);
    },
    limits: {fileSize: 2*1024*1024}
});

module.exports = {upload};