require("dotenv").config();
const express = require("express");
var app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const con = mongoose.connection;

app.use(express.json());

try {
   con.on('open', () => {
      console.log('connected');
   })
} catch (error) {
   console.log("Error: " + error);
}

const authRoute = require('./src/auth/routes/auth.route.js')
const userRoute = require("./src/user/routes/user.route.js")
const productRoute = require("./src/product/routes/product.routes.js")
const fileUploadRoute = require('./src/file-upload/routes/file-upload.route.js')

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/file-upload",fileUploadRoute);



app.listen(process.env.PORT,  ()=> {
    console.log(`Started application on port ${process.env.PORT}`);
});