
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose =require('mongoose');
var Marker_Model = require('../.././models/Marker_Model');


mongoose.connect('mongodb://vwu:2231207@ds017736.mlab.com:17736/vicnetfirstmongodb');

var parsedUrlencoded = bodyParser.urlencoded({extended:false});

router.route('/')
      .get(function(req, res){
       Marker_Model.find(function (err, data) {
         if (err){
           res.send(err);
         }
         else {
           res.json(data);
         }
       });
       })
       
     .post(parsedUrlencoded, function(req, res){
      var Marker_Model= new Marker_Model();
      Marker_Model.name=req.body.name;
      Marker_Model.code=req.body.code;
      Marker_Model.save(function (error) {
        if (error)
        console.log("Error: ", error);

      });
       res.status(201).json(req.body);})
      ;


router.route('/:markerid')
  // get the bear with that id
    .get(function(req, res) {
    Marker_Model.findById(req.params.markerid, function(err, marker) {
      if (err)
        res.send(err);
      res.json(marker);
    });
    })

    // update the bear with this id
    .put(parsedUrlencoded, function(req, res) {
    Marker_Model.findById(req.params.markerid, function(err, marker) {
      if (err){
        console.log(err);
        res.send(err);
}
else {
      marker.name = req.body.name;
      marker.code = req.body.code;
      marker.save(function(err) {
        if (err){
          res.send(err);
          }
        res.json(req.body);
      })};

    });
    })

    // delete the bear with this id
    .delete(function(req, res) {
    Marker_Model.remove({
      _id: req.params.markerid
    }, function(err, marker) {
      if (err)
        res.send(err);
      res.json(marker);
    });
    });
  ;

module.exports = router;
