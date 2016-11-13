var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var locSchema = new Schema({
  type : String,
  coordinates : []
});

var msgSchema = new Schema({
  title : String,
  body : String
});


// var MarkerSchema = new Schema({
//   loc : locSchema,
//   name : String,
//   msg : msgSchema,
//   type : String,
//   code : String
// }, { collection: 'MarkerMapDb' });

var MarkerSchema = new Schema({
  loc : locSchema,
  name : String,
  msg : msgSchema,
  type : String,
  code : String
}, { collection: 'MarkerMapDb' });


module.exports = mongoose.model('Marker_Model', MarkerSchema)



// "loc" : {
//                     "type" : "Point",
//                     "coordinates" : [
//                       39.419675,
//                       -77.447801
//                     ]
//                   },
//                   "name" : "Giant Eagle",
//                   "msg"  : {"title":"Wow!", "body":"Check this out! A homeless people here, so sad! Come and help him plz!"},
//                   "type" : "",
//                   "code" : "PSC"