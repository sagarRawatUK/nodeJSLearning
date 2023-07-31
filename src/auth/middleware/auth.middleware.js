const jwt = require('jsonwebtoken');
const User = require('../model/auth.model.js')

const decodeToken = async function (req, res, next) {
    try {
        const customToken = req.headers.authorization.split('Bearer ').pop();
        const decodede = jwt.verify(customToken, env.jwtSecretKey);
        const user = await User.findOne({ _id: decodede.userId });
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}


module.exports = { decodeToken }