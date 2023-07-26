require("dotenv").config();
const express = require("express");
var app = express();

app.get("/", function (request, response) {
    response.send("Hello World!");
})
app.listen(process.env.PORT, function () {
    console.log(`Started application on port ${process.env.PORT}`);
});