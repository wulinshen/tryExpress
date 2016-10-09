
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose =require('mongoose');
var City_Model = require('../.././models/City_Model');

//
// var cities =[
// {"name":"Suining", "people":"Wu"},
// {"name":"Bei jing", "people":"Wen"},
// {"name":"USA", "people":"Tom"},
// {"name":"法国", "people":"查尔斯"}
// ];

mongoose.connect('mongodb://vwu:2231207@ds017736.mlab.com:17736/vicnetfirstmongodb');

var parsedUrlencoded = bodyParser.urlencoded({extended:false});

router.route('/')
      .get(function(req, res){
       City_Model.find(function (err, data) {
         if (err){
           res.send(err);
         }
         else {
           res.json(data);
         }
       });
       })
       
     .post(parsedUrlencoded, function(req, res){
      var city_Model= new City_Model();
      city_Model.name=req.body.name;
      city_Model.people=req.body.people;
      city_Model.save(function (error) {
        if (error)
        console.log("Error: ", error);

      });
       res.status(201).json(req.body);})
      ;


router.route('/:cityid')
  // get the bear with that id
    .get(function(req, res) {
    City_Model.findById(req.params.cityid, function(err, city) {
      if (err)
        res.send(err);
      res.json(city);
    });
    })

    // update the bear with this id
    .put(parsedUrlencoded, function(req, res) {
    City_Model.findById(req.params.cityid, function(err, city) {
      if (err){
        console.log(err);
        res.send(err);
}
else {
      city.name = req.body.name;
      city.people = req.body.people;
      city.save(function(err) {
        if (err){
          res.send(err);
          }
        res.json(req.body);
      })};

    });
    })

    // delete the bear with this id
    .delete(function(req, res) {
    City_Model.remove({
      _id: req.params.cityid
    }, function(err, city) {
      if (err)
        res.send(err);
      res.json(city);
    });
    });
  ;

module.exports = router;
