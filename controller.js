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
    console.log(players);
  });
});