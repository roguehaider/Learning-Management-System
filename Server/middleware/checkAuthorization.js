const User = require('../models/user');

const checkAuth = (role) => {

    return (req, res, next) => {
        const user = req.user;

    if (!user || user.role !== role) {
        const error = {
            status: 401,
            message: 'Unauthorized'
        };
        return next(error);
    }

    next();
    }
    
};

module.exports = {checkAuth};
