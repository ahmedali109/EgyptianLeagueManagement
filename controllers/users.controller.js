const asyncWrapper = require("../middleware/asyncWrapper");
const User = require('../models/user.model');
const httpStatus = require("../utils/http_status_code");
const AppError = require("../utils/appError");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateJWT = require("../utils/generateJWT");

const getAllUsers = asyncWrapper(async (req,res) => {

    const query = req.query;

    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const users = await User.find({}, {"__v": false, 'password': false}).limit(limit).skip(skip);

    res.status(httpStatus.SUCCESS).json({ status: httpStatus.SUCCESS, data: {users}});
})


const register = asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body;
    const oldUser = await User.findOne({ email: email});
    if(oldUser) {
        const error = AppError.createError({status: httpStatus.NOT_FOUND , message: 'User Already exits. Please Login'});
        return next(error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
    })
    const token = await generateJWT({email: newUser.email, id: newUser._id, role: newUser.role});
    newUser.token = token;
    await newUser.save();
    res.status(httpStatus.CREATED).json({status: httpStatus.CREATED, data: {user: newUser}})
})


const login = asyncWrapper(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email && !password) {
        const error = AppError.createError({status: httpStatus.BAD_REQUEST , message: 'email and password are required' , text: null});
        return next(error);
    }

    const user = await User.findOne({email: email});

    if(!user) {
        const error = AppError.createError({status: httpStatus.NOT_FOUND , message: 'User not found. Please register' , text: null});
        return next(error);
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if(user && matchedPassword) {
       const token = await generateJWT({email: user.email, id: user._id, role: user.role});
        return res.json({ status: httpStatus.SUCCESS, data: {token}});
    } else {
        const error = AppError.createError({status: httpStatus.UNAUTHORIZED , message: 'Invalid Credentials' , text: null});
        return next(error);
    }

})


module.exports = {
    getAllUsers,
    register,
    login
}