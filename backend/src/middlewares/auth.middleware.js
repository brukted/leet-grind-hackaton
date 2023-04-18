const jwt = require('jsonwebtoken');
const AppError = require('../utils/app-error');
const config = require('../config');

function protectRoute(req, _, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.error('Access denied');
        return next(new AppError('Access denied', 401));
    }

    jwt.verify(token, config.jwtPrivateKey, (err, payload) => {
        if (err) {
            console.error(err);
            return next(new AppError('Access denied', 401));
        }
        req.user_id = payload._id;
        next();
    });
}


module.exports = protectRoute;