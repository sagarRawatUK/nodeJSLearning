const express = require("express");

const  userController = require("../controllers/user.controller.js"); 

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:email', userController.getSpecUser);
router.post('/', userController.createUser);
router.patch('/:email', userController.updateUser);
router.delete('/:email', userController.deleteUser);

module.exports=router;