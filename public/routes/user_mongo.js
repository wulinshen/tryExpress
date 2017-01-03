
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose =require('mongoose');
var All_Model = require('../.././models/User_Model');

mongoose.createConnection('mongodb://vwu:2231207@ds017736.mlab.com:17736/vicnetfirstmongodb');

var parsedUrlencoded = bodyParser.urlencoded({extended:false});

var User_Model = All_Model.User;
var Items_Model = All_Model.Items;
var MyOrders_Model = All_Model.MyOrders;
var Friends_Orders_Model = All_Model.Friends_Orders;

router.route('/')
      .get(function(req, res){
       User_Model.find(function (err, data) {
         if (err){
           res.send(err);
         }
         else {
           res.json(data);
         }
       });
    })


     .post(parsedUrlencoded, function(req, res){
      var User_Model= new User_Model();
      User_Model.userName=req.body.userName;
      User_Model.profileUrl=req.body.profileUrl;
      User_Model.stars=req.body.stars;

      User_Model.save(function (error) {
        if (error)
        console.log("Error: ", error);

      });
       res.status(201).json(req.body);});


router.route('/:userid')
    .get(function(req, res) {
    User_Model.findById(req.params.userid, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
    })

    .put(parsedUrlencoded, function(req, res) {
    User_Model.findById(req.params.userid, function(err, user) {
      if (err){
        console.log(err);
        res.send(err);
}
else {
      user.userName = req.body.userName;
      user.profileUrl = req.body.profileUrl;
      user.starts = req.body.stars;
      user.save(function(err) {
        if (err){
          res.send(err);
          }
        res.json(user);
      })};
     });
    })


    .delete(function(req, res) {
    User_Model.remove({
      _id: req.params.userid
    }, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
    });
  ;





          // var ItemsSchema = new Schema({
          //   itemName: String,
          //   category: String,
          //   description: String,
          //   itemImageUrl: String,
          //   isAdded: {type: Boolean, default: false},
          //   upload_Date: {type: Date, default: Date.now}
          // });
          router.route('/:userid/items')
              .post(parsedUrlencoded, function(req, res) {
              User_Model.findById(req.params.userid, function(err, user) {
                if (err){
                  console.log(err);
                  res.send(err);
          }
          else {
            var newItems_Model = new Items_Model();
            newItems_Model.itemName=req.body.itemName;
            newItems_Model.category=req.body.category;
            newItems_Model.description=req.body.description;
            newItems_Model.itemImageUrl=req.body.itemImageUrl;

            User_Model.findByIdAndUpdate(
                    req.params.userid,
                    {$addToSet: {"items": newItems_Model}},
                    {safe: true, upsert: true, new : true},
                    function(err, model) {
                        console.log('error: ',err);
                        console.log('newItems_Model: ',newItems_Model);
                        res.send(newItems_Model);
                    }
                );
              };
            });
          })
              // var ItemsSchema = new Schema({
              //   itemName: String,
              //   category: String,
              //   description: String,
              //   itemImageUrl: String,
              //   isAdded: {type: Boolean, default: false},
              //   upload_Date: {type: Date, default: Date.now}
              // });

              router.route('/:userid/items/:itemid')
                  .put(parsedUrlencoded, function(req, res) {
                  User_Model.findById(req.params.userid, function(err, user) {
                    if (err){
                      console.log(err);
                      res.send(err);
              }
              else {
                var newItems_Model = new Items_Model();
                newItems_Model.itemName=req.body.itemName;
                newItems_Model.category=req.body.category;
                newItems_Model.description=req.body.description;
                newItems_Model.itemImageUrl=req.body.itemImageUrl;

                User_Model.findByIdAndUpdate(
                        req.params.userid,
                        {$set: {"items": newItems_Model}},
                        {safe: true, upsert: true, new : true},
                        function(err, model) {
                            console.log('error: ',err);
                            console.log('newItems_Model: ',newItems_Model);
                            res.send(newItems_Model);
                        }
                    );
                  };
                });
              })



module.exports = router;
