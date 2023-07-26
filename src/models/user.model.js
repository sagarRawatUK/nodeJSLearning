const mongoose = require("mongoose")

const UserSchema =  mongoose.Schema({
    firstName: {type: String, required: true, },
    lastName: {type: String, required: true,},
    email: {type: String, required: true,},
});

var userData = mongoose.model("user", UserSchema);

module.exports = userData;