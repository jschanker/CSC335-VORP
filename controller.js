/**
 * Dependencies
 */
var async = require("async");
var SalaryModel = require('./models/playerSalary.model.js');
var PlayerListModel = require('./models/playerList.model.js');

/**
 * Function Calls
 */
PlayerListModel.getAllPlayers(function (err, players) {
  async.forEachOf(players, function (player, key, done) {
    SalaryModel.getPlayerSalary(key, function (err, salary) {
      if (err) {
        console.log("Error getting player " + player.name + " salary");
        console.log("Error: " + err);
      }
      //Set the player salary
      player.salary = salary;
      done();
    });
  }, function (err) {
    console.log(players);
  });
});