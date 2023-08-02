const Product = require('../model/product.model.js')

const axios = require("axios").create({baseUrl: "https://jsonplaceholder.typicode.com/"});

exports.addProduct = async (req, res, next) => {
    const { product_name, price } = req.body
    try {
        if(req.user._id == null){
            return res.status(400).json({
                message: "User doesn't Exist",
            });
        } else if(product_name == null || price == null){
            return res.status(400).json({
                message: "Product name & price is required",
            });
        }else{
           const newProduct =  new Product({
               product_name: product_name,
               price: price,
               added_by: req.user._id
           });
           const savedProduct = await newProduct.save();
           return res.status(200).json({
               message: "Product added successfully",
               product: savedProduct,
           });
        }
    } catch (error) {
        console.log(`Add Product Error`, error);
        return res.status(500).json({
            message: "Add Product Failed",
            error: error,
        });
    }
}

exports.getProducts = async (req,res,next)=>{
    try {
        if(req.user._id == null){
            return res.status(400).json({
                message: "User doesn't Exist",
            });
        }
		const response = await axios({
			url: "users",
			method: "get",
		});
		res.status(200).json(response.data);
	} catch (err) {
		res.status(500).json({ message: err });
	}
} 