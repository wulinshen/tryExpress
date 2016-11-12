
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose =require('mongoose');
var Marker_Model = require('../.././models/Marker_Model');


mongoose.createConnection('mongodb://vwu:2231207@ds017736.mlab.com:17736/vicnetfirstmongodb');

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

                //"loc" : {
                //     "type" : "Point",
                //     "coordinates" : [
                //       39.419675,
                //       -77.447801
                //     ]
                //   },
                //   "name" : "Giant Eagle",
                //   "msg"  : {"title":"Wow!", "body":"Check this out! A homeless people here, so sad! Come and help him plz!"},
                //   "type" : "",
                //   "code" : "PSC"
       
     .post(parsedUrlencoded, function(req, res){
      var marker_Model = new Marker_Model();
      var rb= req.body;
      marker_Model.loc = {"type": rb.geoType, "coordinates":[rb.lat, rb.lng]};
      marker_Model.name = rb.name;
      marker_Model.msg = {"title":rb.title, "body":rb.body};
      marker_Model.type = rb.type;
      marker_Model.code = rb.code;
      marker_Model.save(function (error) {
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
