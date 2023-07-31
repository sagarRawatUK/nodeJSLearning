
require("dotenv").config();
const jwt = require('jsonwebtoken');
const User = require('../../auth/model/auth.model.js')

const decodeToken = async function(req,res,next){
    try{
        const customToken = req.headers.authorization.split('Bearer ').pop();
        const decodede = jwt.verify(customToken, process.env.JWTSECRETKEY);
        const user = await User.findOne({_id: decodede.userId});
        req.user = user;
        next();
    }catch(error){
        next(error);
    }
}


module.exports = {decodeToken}