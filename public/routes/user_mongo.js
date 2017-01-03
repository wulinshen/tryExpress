
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
      var newUser_Model= new User_Model();
      newUser_Model.userName=req.body.userName;
      newUser_Model.profileUrl=req.body.profileUrl;
      newUser_Model.stars=req.body.stars;
      newUser_Model.items=[];
      newUser_Model.myOrders=[];
      newUser_Model.friends_Orders=[];

      newUser_Model.save(function (err) {
        if (err)
        console.log("Error: ", err);
        // res.send(err);
      });
       res.status(201).json(newUser_Model);});

         // var UserSchema = new Schema({
         //   userName : String,
         //   profileUrl : String,
         //   stars: Number,
         //   items:[ItemsSchema],
         //   myOrders:[MyOrdersSchema],
         //   friends_Orders:[Friends_OrdersSchema]
         // }, { collection: 'User_models' });


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


// router.route('/:userid/items')-----router.route('/:userid/items')-----router.route('/:userid/items')----router.route('/:userid/items')router.route('/:userid/items')router.route('/:userid/items') //

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

                User_Model.update(
                        {
                        "_id" : req.params.userid,
                        "items._id" : req.params.itemid
                        },
                        {$set: {"items.$": newItems_Model}},
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


                  .delete(parsedUrlencoded, function(req, res) {
                  User_Model.findById(req.params.userid, function(err, user) {
                    if (err){
                      console.log(err);
                      res.send(err);
              }
              else {
                User_Model.update(
                        {
                          "_id" : req.params.userid
                        },
                        {
                          $pull: {"items": {"_id": req.params.itemid}}
                        },
                        function(err, status) {
                          if (err){
                            console.log(err);
                            res.send(err);
                          }
                          else {
                            res.send(status);
                            }
                        }
                    );
                  };
                });
              })

// router.route('/:userid/items')-----router.route('/:userid/items')-----router.route('/:userid/items')----router.route('/:userid/items')router.route('/:userid/items')router.route('/:userid/items') //



module.exports = router;
