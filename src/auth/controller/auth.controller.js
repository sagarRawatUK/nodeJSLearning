const router = require('express').Router()
require("dotenv").config();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../model/auth.model.js')


const register = async (req, res) => {
    try {
        const { email, password, username, mobileNo } = req.body;
        const isUserExist = await User.findOne({email});
        if(isUserExist){
            throw new Error('Email or Phone already exist')
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user =  new User({ email, password:hashedPassword, username });
        await user.save()
        res.status(200).json({ message: "User Registered Successfully",username:username,email:email});
    }
    catch (error) {
        console.log(`/register error ${error}`);
        console.log(error)
        res.status(500).json({ message:error.message});
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid Email" });
        }
        const passwordMatch = bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWTSECRETKEY, { expiresIn: "1d" });
        res.json({ token });
    }
    catch (error) {
        console.log(`/login error ${error}`);
        console.log(error)
        res.status(500).json({ message: "Failed to login" });
    }
};


module.exports = {

    login,
    register
}
