
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose =require('mongoose');
mongoose.Promise = require('bluebird');
var All_Model = require('../.././models/User_Model');

mongoose.createConnection('mongodb://vwu:2231207@ds017736.mlab.com:17736/vicnetfirstmongodb');

var parsedUrlencoded = bodyParser.urlencoded({extended:false});

var User_Model = All_Model.User;
var Items_Model = All_Model.Items;
var MyOrders_Model = All_Model.MyOrders;
var Friends_Orders_Model = All_Model.Friends_Orders;

router.route('/')
      // var promise = User.findById('123').exec();
      //
      // promise.then(function(user) {
      //   user.name = 'Robert Paulson';
      //
      //   return user.save(); // returns a promise
      // })
      // .then(function(user) {
      //   console.log('updated user: ' + user.name);
      //   // do something with updated user
      // })
      // .catch(function(err){
      //   // just need one of these
      //   console.log('error:', err);
      // });

      .get((req, res) => {
       var promise = User_Model.find().exec();
       promise.then(user => {
       // console.log(user);
       res.json(user); // returns a promise
       })
       .catch(err => {
         res.json(err);
       });
      })

     .post(parsedUrlencoded, (req, res) => {
      var newUser_Model= new User_Model();
      newUser_Model.userName=req.body.userName;
      newUser_Model.profileUrl=req.body.profileUrl;
      newUser_Model.stars=req.body.stars;
      newUser_Model.items=[];
      newUser_Model.myOrders=[];
      newUser_Model.friends_Orders=[];

      newUser_Model.save()
      .then(user=> {
        res.status(201).json(newUser_Model);
      })
      .catch(err => {
         res.json(err);
       })
      }
     );




router.route('/:userid')
    .get((req, res) => {
    var promise = User_Model.findById(req.params.userid).exec();
    promise.then(user => {
    console.log(user);
    res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
   })


    .put(parsedUrlencoded, (req, res) => {
    var promise = User_Model.findById(req.params.userid).exec();
    promise.then(user => {
    user.userName = req.body.userName;
    user.profileUrl = req.body.profileUrl;
    // user.starts = req.body.stars;
    return user.save()})
    .then(user => {
    res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
   })


    .delete((req, res) => {
    // var promise = User_Model.findById(req.params.userid).exec();
    var promise = User_Model.remove({_id: req.params.userid}).exec();
    promise.then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
     })
    });



// router.route('/:userid/items')-----router.route('/:userid/items')-----router.route('/:userid/items')----router.route('/:userid/items')router.route('/:userid/items')router.route('/:userid/items') //

              router.route('/:userid/items')
              .post(parsedUrlencoded, function(req, res) {
                var promise = User_Model.findById(req.params.userid).exec();
                promise.then(user => {
                var newItems_Model = new Items_Model();
                newItems_Model.itemName=req.body.itemName;
                newItems_Model.category=req.body.category;
                newItems_Model.description=req.body.description;
                newItems_Model.itemImageUrl=req.body.itemImageUrl;
                return User_Model.findByIdAndUpdate(
                        req.params.userid,
                        {$addToSet: {"items": newItems_Model}},
                        {safe: true, upsert: true, new : true})
                  })
              .then(user => {
              res.json(user);
              })
              .catch(err => {
                res.json(err);
              })
           })


              router.route('/:userid/items/:itemid')
                  .put(parsedUrlencoded, (req, res) => {
                    var promise = User_Model.findById(req.params.userid).exec();
                    promise.then(user => {
                      var newItems_Model = new Items_Model();
                      newItems_Model.itemName=req.body.itemName;
                      newItems_Model.category=req.body.category;
                      newItems_Model.description=req.body.description;
                      newItems_Model.itemImageUrl=req.body.itemImageUrl;
                      return User_Model.update(
                              {
                              "_id" : req.params.userid,
                              "items._id" : req.params.itemid
                              },
                              {
                                $set: {"items.$": newItems_Model}
                              },
                              {
                                safe: true, upsert: true, new : true
                              }
                            )
                          })
                            .then(user => {
                            res.json(user);
                            })
                            .catch(err => {
                            res.json(err);
                            })
                       })




                  .delete(parsedUrlencoded, (req, res) => {
                  var promise = User_Model.findById(req.params.userid).exec();
                  promise.then(user =>{
                  return User_Model.update(
                            {
                              "_id" : req.params.userid
                            },
                            {
                              $pull: {"items": {"_id": req.params.itemid}}
                            })
                          })
                  .then(user=>{
                    res.send(status);
                  })
                  .catch(err=>{
                    res.send(err);
                  })
                });
                ;



// router.route('/:userid/items')-----router.route('/:userid/items')-----router.route('/:userid/items')----router.route('/:userid/items')router.route('/:userid/items')router.route('/:userid/items') //



module.exports = router;
