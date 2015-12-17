//Dependencies
var _ = require("underscore");

var Process = module.exports = {};

Process.maxVORP = function (positions, budget) {
  var vorp = 0;
  for (var currentPosition in positions) {
    var currentPlayerList = positions[currentPosition];
    for (var playerName in currentPlayerList) {
      var currentPlayer = currentPlayerList[playerName];
      var currentSalary = parseInt(currentPlayer.salary);
      if (currentSalary <= budget) {
        var newBudget = budget - currentPlayer.salary;
        var subListOfPositions = _.clone(positions);
        delete subListOfPositions[currentPosition];

        var newVorp = parseFloat(currentPlayer.vorp) + Process.maxVORP(subListOfPositions, newBudget);
        vorp = Math.max(vorp, newVorp);
      }
    }
    delete positions[currentPosition];
  }
  //In the case of an empty list or expensive players
  return vorp;
};