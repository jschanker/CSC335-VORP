//Dependencies
var _ = require("underscore");

var Process = module.exports = {};

Process.maxVORP = function (positions, budget) {
  var vorp = 0;
  var firstPosition = Object.keys(positions)[0];
  if (firstPosition) {
    var subListOfPositions = _.clone(positions);
    delete subListOfPositions[firstPosition];
    vorp = Process.maxVORP(subListOfPositions, budget);
    var currentPlayerList = positions[firstPosition];
    for (var playerName in currentPlayerList) {
      var currentPlayer = currentPlayerList[playerName];
      var currentSalary = parseInt(currentPlayer.salary);
      if (currentSalary <= budget) {
        var newBudget = budget - currentPlayer.salary;
        subListOfPositions = _.clone(positions);
        delete subListOfPositions[firstPosition];

        var newVorp = parseFloat(currentPlayer.vorp) + Process.maxVORP(subListOfPositions, newBudget);
        vorp = Math.max(vorp, newVorp);
      }
    }
  }
  //In the case of an empty list or expensive players
  return vorp;
};