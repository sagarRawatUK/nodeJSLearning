const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_name: {type: String,required: true},
    price: {type: Number,required: true},
    added_by: {type: mongoose.Schema.ObjectId,ref: 'users',required: true},
});

module.exports = mongoose.model('product',productSchema)