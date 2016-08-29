var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var CitySchema = new Schema({
  name : String,
  people : String
});

module.exports = mongoose.model('City_Model', CitySchema)
