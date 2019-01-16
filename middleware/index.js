const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    verify(req, res, next) {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(403).json({
                message: 'No token'
            });
        }
        jwt.verify(token, process.env.JWT_SECRET, (error, verified) => {
            if (error) {
                return res.status(403).json({
                    message: 'Invalid or expired token'
                });
            }
            req.decoded = verified;
            return next();
        });
    }
}