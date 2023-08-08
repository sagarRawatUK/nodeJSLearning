const router = require('express').Router()
const fileUploadController = require('../controller/file-upload.controller.js')
const  upload  = require('../middleware/file-upload.middleware.js')

router.post('/upload',upload,fileUploadController.uploadFile);

module.exports = router;