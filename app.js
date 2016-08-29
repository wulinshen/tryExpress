var express = require('express');
var cityRouter = require('./public/routes/city_mongo');
var app = express();


app.use(express.static('public'));
//app.use('/cities', cityRouter);

app.listen(3000, ()=>{console.log("Online Now at 3000");});
