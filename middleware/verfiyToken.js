const jwt = require('jsonwebtoken');
const httpStatus = require("../utils/http_status_code");
const statusText = require("../utils/http_status_text");
const AppError = require('../utils/appError');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if(!authHeader) {
        const error = AppError.createError({status: httpStatus.NOT_FOUND , message: 'token not found'});
        return next(error);
    }
    const token = authHeader.split(' ')[1];
    try {
        const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.currentUser = currentUser;
        next();

    } catch (err) {
        const error = AppError.createError({
            status: httpStatus.UNAUTHORIZED,
            message: 'invalid token',
            text: statusText.ERROR
        });
        return next(error);
    }
}

module.exports = verifyToken;