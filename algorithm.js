//Dependencies
var _ = require("underscore");

var Process = module.exports = {};

Process.maxVORP = function (positions, budget, callback) {
  //Memo object
  var memo = {};

  var mV = function (positions, budget) {
    //In the case of an empty list the default vorp is 0
    var result = {
      vorp: 0,
      team: {}
    };
    var positionKeys = Object.keys(positions);
    var firstPosition = positionKeys[0];
    if (firstPosition) {
      var subListOfPositions = _.clone(positions);
      delete subListOfPositions[firstPosition];
      result = mV(subListOfPositions, budget);
      var currentPlayerList = positions[firstPosition];
      for (var playerName in currentPlayerList) {
        var currentPlayer = currentPlayerList[playerName];
        var currentSalary = parseInt(currentPlayer.salary);
        if (currentSalary <= budget) {
          var newBudget = budget - currentPlayer.salary;

          var lengthOfPositions = positionKeys.length;
          var subProblem;
          if (!isInMemo(newBudget, lengthOfPositions)) {
            subProblem = mV(subListOfPositions, newBudget);
            subProblem.vorp += parseFloat(currentPlayer.vorp);
            subProblem.team[playerName] = currentPlayer;
            addToMemo(budget, lengthOfPositions, subProblem);
          } else {
            subProblem = getMemo(budget, lengthOfPositions);
          }
          if (subProblem.vorp > result.vorp) {
            result.vorp = subProblem.vorp;
            result.team = subProblem.team;
          }
        }
      }
    }
    return result;
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

  return callback(mV(positions, budget), memo);
};