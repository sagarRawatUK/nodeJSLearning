const router = require('express').Router()
const productController  = require('../controller/product.controller.js')
const { decodeToken } = require('../../user/middleware/user.middleware.js');

router.post('/add-product',decodeToken,productController.addProduct);

module.exports = router;