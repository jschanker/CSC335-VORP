//Dependencies
var _ = require("underscore");

var Process = module.exports = {};

Process.maxVORP = function (players, budget, positionsFilled) {
  var vorp = 0;
  if (positionsFilled.length < 9)
    for (playerName in players) {
      var currentPlayer = players[playerName];
      if (!(currentPlayer.position in positionsFilled) && (currentPlayer.salary <= budget)) {
        var newBudget = budget - currentPlayer.salary;
        var newPositionsFilled = _.map(positionsFilled, _.clone);
        newPositionsFilled.push(currentPlayer.position);
        var subList = _.clone(players);
        delete subList[playerName];

        var newVorp = parseFloat(currentPlayer.vorp) + Process.maxVORP(subList, newBudget, newPositionsFilled);
        vorp = Math.max(vorp, newVorp);
      }
    }
  //In the case of an empty list or expensive players
  return vorp;
};