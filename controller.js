/**
 * Dependencies
 */
var async = require("async");
var SalaryModel = require('./models/playerSalary.model.js');
var PlayerListModel = require('./models/playerList.model.js');
var express = require('express');
var app = express();
var algorithm = require("./algorithm.js");

//Globals
var port = 3000;

//Setup Server
app.set('view engine', 'jade');

/**
 * Main Page
 */
app.get("/", function (req, res) {
  PlayerListModel.getAllPlayers(function (err, players) {
    async.forEachOf(players, function (player, key, done) {
      SalaryModel.getPlayerSalary(key, function (err, salary) {
        if (err) {
          console.log("Error getting player " + player.name + " salary");
          console.log("Error: " + err);
        }
        //If the player salary is a truthy value, set the player salary
        if (salary) {
          player.salary = salary;
        } else {
          //Otherwise, remove the player from the list
          delete players[key];
        }
        done();
      });
    }, function (err) {
      //This is run when all the salaries are retrieved or there is an error
      //console.log(players);
      var budget = 3000000;
      var answer = algorithm.maxVORP(players,budget,[],{});
      console.log("Answer",answer);
      var renderData = {
        "team": players,
        "maxVorp": answer
      };
      return res.render("index", renderData);
    });
  });
});

//Run the web server
app.listen(port, function() {
  console.log("Running on port", port);
});