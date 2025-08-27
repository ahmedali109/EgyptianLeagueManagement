const express = require('express');
const router = express.Router();
const multer = require('multer');
const usersController = require('../controllers/users.controller')
const verifyToken = require('../middleware/verfiyToken');
const AppError = require('../utils/appError');

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null , 'uploads'),
    filename: (req , file , cb) =>{
        const extension = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${extension}`;
        cb(null, fileName);
    }
})

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];
    if(imageType === 'image') {
        return cb(null, true)
    } else {
        return cb(AppError.createError({message: 'file must be an image' , status: 400}), false)
    }
}

const upload = multer({
    storage: diskStorage,
    fileFilter
});

router.route('/')
            .get(verifyToken, usersController.getAllUsers)

router.route('/register')
            .post(upload.single('avatar') , usersController.register)

router.route('/login')
            .post(usersController.login)

module.exports = router;