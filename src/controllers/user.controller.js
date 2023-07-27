const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors')

const User = require('../models/user.model.js');

const { userSchema } = require('../helper/user.validation.js');

const router = express.Router();

const getUsers = async (req, res) => {
    try {
        const user = await User.find();

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getSpecUser = async (req, res) => {

    const email = req.params.email;

    try { 
        const result = await userSchema.validateAsync(email); 
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }

    try {
        const user = await User.findOne({ email: email });

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createUser = async (req, res) => {

    console.log(`Request Body : ${req.body}`);

    try { 
        const result = await userSchema.validateAsync(req.body); 
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }

    const user = await User.findOne({ email: req.params.email });

    if (user) {
        res.status(400).json({ message: `${req.params.emai} is already been registered` });
    }

    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    })
    try {
        await newUser.save();

        res.status(201).json(newUser);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

const updateUser = async (req, res) => {
    const email = req.params.email;

    try { 
        const result = await userSchema.validateAsync(email); 
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
    try {
        await User.findOneAndUpdate({
            email: email,
        },
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
            }
        )
        res.status(202).json({ email: email });

    } catch (error) {
        res.status(401).json({ message: error.message });
    }

}

const deleteUser = async (req, res) => {
    const email = req.params.email;

    try { 
        const result = await userSchema.validateAsync(email); 
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }

    try {
        await User.findOneAndRemove({ email: email });
        res.status(203).json({ email: email });

    } catch (error) {
        res.status(402).json({ message: error.message });
    }
}

module.exports.getUsers = getUsers;
module.exports.getSpecUser = getSpecUser;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;