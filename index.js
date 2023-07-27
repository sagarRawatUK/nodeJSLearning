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


const userRouter= require("./src/routes/user.route.js");
app.use('/user',userRouter)


app.listen(process.env.PORT,  ()=> {
    console.log(`Started application on port ${process.env.PORT}`);
});