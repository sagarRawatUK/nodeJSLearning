const multer = require("multer");
const util = require("util");
const path = require('path');
const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

const upload = multer({storage: storage ,limits: {
    fileSize: maxSize
}}).single('file');


const uploadFileMiddleware = util.promisify(upload);

module.exports =  uploadFileMiddleware;