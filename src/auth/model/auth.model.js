const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    unique:true, 
    sparse:true
   },
  password: {
     type: String 
    },
  mobileNo: { 
    type: String,
     unique: true,
     
     sparse: true },
  username: {
     type: String
     },
});
userSchema.pre('save',async function(){

  if(this.isModified('password')){

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
  }
  return this;
})

module.exports = mongoose.model('user', userSchema)