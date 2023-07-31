const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  mobileNo: { type: String, unique: true, sparse: true },
  username: { type: String, default: "" },
});


module.exports = mongoose.model('user', userSchema)