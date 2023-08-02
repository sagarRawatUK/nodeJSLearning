const router = require('express').Router()
require("dotenv").config();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../model/auth.model.js')
const nodemailer = require('nodemailer')


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
        res.status(200).json({ token });
    }
    catch (error) {
        console.log(`/login error ${error}`);
        console.log(error)
        res.status(500).json({ message: "Failed to login" });
    }
};

const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(process.env.USER)
        console.log(process.env.PASS)

        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: 'sagarrawatuk3@gmail.com',
                pass: process.env.PASS,
            },
        });

        const mailOptions = {
            from: process.env.USER,
            to: user.email,
            subject: 'Reset Password Request',
            text: 'Click the link below to reset your password:',
            html: `<p>Click the link below to reset your password:</p><a href="http://your-frontend-app/reset-password/">Reset Password</a>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email' });
            }

            console.log('Email sent:', info.response);
            return res.status(200).json({ message: 'Email sent successfully' });
        });




    } catch (error) {

        console.error('Forgot password error:', error);
        return res.status(500).json({ message: 'Something went wrong' });

    }
}


module.exports = {
    login,
    register,forgotPassword,
}
