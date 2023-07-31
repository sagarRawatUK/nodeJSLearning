const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  password: {
    type: String
  },
  mobileNo: {
    type: String,
    unique: true,
    sparse: true
  },
  username: {
    type: String
  },
});


module.exports = mongoose.model('user', userSchema)