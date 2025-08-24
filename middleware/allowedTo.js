const AppError = require("../utils/appError");
const httpStatus = require("../utils/http_status_code");

module.exports = (...roles) => {    
    return (req, res, next) => {
        if(!roles.includes(req.currentUser.role)) {
            return next(AppError.createError({status: httpStatus.UNAUTHORIZED , message: 'Invalid Credentials'}));
        }
        next();
    }
}