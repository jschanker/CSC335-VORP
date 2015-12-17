//Dependencies
var _ = require("underscore");

var Process = module.exports = {};

Process.maxVORP = function (positions, budget) {
  //Memo object
  var memo = {};

  var mV = function (positions, budget) {
    //In the case of an empty list the default vorp is 0
    var vorp = 0;
    var positionKeys = Object.keys(positions);
    var firstPosition = positionKeys[0];
    if (firstPosition) {
      var subListOfPositions = _.clone(positions);
      delete subListOfPositions[firstPosition];
      vorp = mV(subListOfPositions, budget);
      var currentPlayerList = positions[firstPosition];
      for (var playerName in currentPlayerList) {
        var currentPlayer = currentPlayerList[playerName];
        var currentSalary = parseInt(currentPlayer.salary);
        if (currentSalary <= budget) {
          var newBudget = budget - currentPlayer.salary;
          subListOfPositions = _.clone(positions);
          delete subListOfPositions[firstPosition];

          var lengthOfPositions = positionKeys.length;
          var newVorp;
          if (!isInMemo(newBudget, lengthOfPositions)) {
            newVorp = parseFloat(currentPlayer.vorp) + mV(subListOfPositions, newBudget);
            addToMemo(budget, lengthOfPositions, newVorp);
          } else {
            newVorp = getMemo(budget, lengthOfPositions);
          }
          vorp = Math.max(vorp, newVorp);
        }
      }
    }
    return vorp;
  };

  function isInMemo(budget, positionsLeft) {
    return memo && memo[positionsLeft] && memo[positionsLeft][budget] !== undefined;
  }

  function getMemo(budget, positionsLeft) {
    return memo[positionsLeft][budget];
  }

  function addToMemo(budget, positionsLeft, value) {
    if (!memo[positionsLeft]) {
      memo[positionsLeft] = {};
    }
    memo[positionsLeft][budget] = value;
  }

  return mV(positions, budget);
};