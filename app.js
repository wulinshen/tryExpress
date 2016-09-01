var express = require('express');
var cityRouter = require('./public/routes/city_mongo');
var app = express();

app.set('port', (process.env.PORT || 8000));


app.use(express.static('public'));
app.use('/cities', cityRouter);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
