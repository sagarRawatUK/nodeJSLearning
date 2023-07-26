const express= require('express');
const mongoose= require('mongoose');

const User= require('../models/user.model.js');

const router= express.Router();

const getUsers = async (req, res) => {
    try {
        const user= await User.find();
        
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

const getSpecUser = async (req,res) => {
    const email = req.params.email;

    try {
        const user = await User.findOne({email: email});

        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
}

const createUser =  async (req, res) => {
    console.log(req.body);
    const newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
    })
    try {
        await newUser.save();

        res.status(201).json(newUser);

    } catch(error) {
        res.status(400).json({ message : error.message});
    }

}

const updateUser = async (req, res) => {
    const email= req.params.email;
    try{
        await User.findOneAndUpdate({
            email: email,
        },
        {   
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
        }
        )
        res.status(202).json({email: email});

    } catch (error) {
        res.status(401).json({message: error.message});
    }
    
}

const deleteUser = async (req, res) => {
    const roll= req.params.email;

    try {
        await User.findOneAndRemove({email: email});
        res.status(203).json({email:email});

    }catch(error) {
        res.status(402).json({message: error.message});
    }
}

module.exports.getUsers= getUsers;
module.exports.getSpecUser= getSpecUser;
module.exports.createUser= createUser;
module.exports.updateUser= updateUser;
module.exports.deleteUser= deleteUser;