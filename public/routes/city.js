
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var cities =[
{"name":"Suining", "people":"Wu"},
{"name":"Bei jing", "people":"Wen"},
{"name":"USA", "people":"Tom"},
{"name":"法国", "people":"查尔斯"}
];

var parsedUrlencoded = bodyParser.urlencoded({extended:false});

router.route('/')
      .get(function(req, res){
       res.json(cities);})
     .post(parsedUrlencoded, function(req, res){
      var newCityObj={
        "name": req.body.name,
        "people": req.body.people
      };
      cities.push(newCityObj);
       res.status(201).json(newCityObj+" Inserted!");})
      ;


router.route('/:name')
      .all(function (req, res, next) {
        var cityName=req.params.name;
        //var block=cityName[0].toUpperCase()+cityName.slice(1).toLowerCase();
        req.newCityName=cityName;
        next();
      })
      .get(function (req, res) {
  var passedCityName = req.newCityName;
  var people=cities.filter(item=>item.name==passedCityName);
  // console.log("passedCityName ", passedCityName);
  // console.log("people", people);
  // console.log("people.name", people[0].people);
  res.json(people[0].people);})

      .put(parsedUrlencoded, function (req, res) {
        var passedCityName = req.newCityName;
        var existingPeople=cities.filter(item=>item.name==passedCityName);
        if (existingPeople){
          existingPeople[0].people=req.body.people;
          console.log("existingPeople[0].name", existingPeople[0].name);
          res.status(201).json(existingPeople[0].name + "'s people was Updated")
        }
        else{
          res.status(404).json("Can't update this city! Doesn't exist!");
        }
      })

      .delete(parsedUrlencoded, function (req, res) {
        var passedCityName = req.newCityName;
        var existingPeople=cities.filter(item=>item.name==passedCityName);
        if (existingPeople){
          existingPeople[0].people=req.body.people;
          cities = cities.filter(item=>item.name!==existingPeople[0].name);
          res.status(201).json(existingPeople[0].name + "'s people was Delete")
        }
        else{
          res.status(404).json("Can't update this city! Doesn't exist!");
        }
      })
  ;

module.exports = router;
