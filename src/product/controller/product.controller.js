const Product = require('../model/product.model.js')

exports.addProduct = async (req, res, next) => {
    const { product_name, price } = req.body
    try {
        if(req.user._id == null){
            return res.status(400).json({
                message: "No User Found",
                code: 400,
                query:{
                    product_name : product_name,
                    price: price
                }
            });
        } else if(product_name == null || price == null){
            return res.status(400).json({
                message: "Product name & price is required",
                code: 400,
                query:{
                    product_name : product_name,
                    price: price
                }
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
               code: 200,
               product: savedProduct,
               query:{
                product_name : product_name,
                price: price
               }
           });
        }
    } catch (error) {
        console.log(`Add Product Error`, error);
        return res.status(500).json({
            message: "Add Product Failed",
            code: 500,
            error: error,
        });
    }
}