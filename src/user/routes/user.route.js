const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js')
const { decodeToken } = require('../middleware/user.middleware.js')


router.get('/get', decodeToken, userController.getUser);

router.put('/update', decodeToken, userController.updateUser);

router.delete('/delete',decodeToken, userController.deleteUser);

module.exports = router;
