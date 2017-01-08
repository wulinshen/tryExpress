var express = require('express');
var cityRouter = require('./public/routes/city_mongo');
var markerRouter = require('./public/routes/MarkerMap');
var userRouter = require('./public/routes/user_mongo');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');

app.use(cors());


//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('port', (process.env.PORT || 8000));


app.use(express.static('public'));
app.use('/cities', cityRouter);
app.use('/markers', markerRouter);
app.use('/users', userRouter);


app.listen(app.get('port'), function() {
  console.log('Hi,Vince, Node app is running on port', app.get('port'));
});
