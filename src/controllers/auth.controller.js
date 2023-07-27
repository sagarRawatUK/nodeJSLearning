const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors')
const User = require('../models/auth.model.js')

const { authSchema } = require('../helper/auth.validation.js');

const loginUser = async (req, res,next) => {

    try {
        const result = await authSchema.validateAsync(req.body)
        const user = await User.findOne({ email: result.email })
        if (!user) throw createError.NotFound('User not registered')
  
        const isMatch = await user.isValidPassword(result.password)
        if (!isMatch)
          throw createError.Unauthorized('Username/password not valid')
  
  
          res.status(200).json({"message":"Login Successful"})
      } catch (error) {
        if (error.isJoi === true)
          return next(createError.BadRequest('Invalid Username/Password'))
        next(error)
      }
};

const registerUser = async (req, res,next) => {

    try {
        
        const result = await authSchema.validateAsync(req.body)
  
        const doesExist = await User.findOne({ email: result.email })
        if (doesExist)
          throw createError.Conflict(`${result.email} is already been registered`)
  
        const user = new User(result)
        const savedUser = await user.save()
  
        res.status(200).json({"message":"User Registered Successfully"})
      } catch (error) {
        if (error.isJoi === true) error.status = 422
        next(error)
      }
    

};


module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;

