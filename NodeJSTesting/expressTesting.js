const express = require('express');
const app = express();
var path = require("path");

app.get("/",function(req, res){
    
    res.status(200).sendFile(path.join(__dirname,"/","index.html"))
});
app.get("/main", function (req, res) {
    
    res.status(200).sendFile(path.join(__dirname,"/","main.html"))
});

app.get("/index", function (req, res) {
    
    res.status(401).sendFile(path.join(__dirname,"/","index.html"))
});
app.set("name","Jack")


app.listen(3000, function () {
    console.log("we are on port 3000");
});

