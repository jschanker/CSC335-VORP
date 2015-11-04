var cheerio = require("cheerio");
var async = require("async");
var request = require("request");

//Attaches and returns a reference jQuery as well as html
function jQueryConnector(url, callback) {
  //console.log(url)
  request("http://www.baseballprospectus.com" + url, function (err, response, html) {
    //Callback only iwth the error if there is an error
    if (err) {
      callback(err);
    }
    //Create jQuery from cheerio
    var jQuery = cheerio.load(html);
    //Callback with jQuery
    callback(err, jQuery);
  });
}

function parseTableRowsToPlayersObject(rowArray, jQuery, callback) {
  var playersObject = {};
  rowArray.forEach(function(currentRow){
    //Attach a function to each row to easily retrieve cell text
    currentRow.getCell = function(index) {
      //Returns the text at the cell specified by the index
      return jQuery(currentRow).find("td").eq(index);
    };
    //Get the player's name cell
    var nameCell = currentRow.getCell(rowIndex.name);
    //Get the player's personal url
    var playerURL = nameCell.find("a").attr("href");
    //Get the player's name
    var name = nameCell.text();
    //Create the new player object
    playersObject[name] = {
      url: playerURL,
      position: currentRow.getCell(rowIndex.position).text(),
      vorp: currentRow.getCell(rowIndex.vorp).text()
    };
  });
  callback(null, playersObject);
}

function getPlayerSalary(playerURL, callback) {
  jQueryConnector(playerURL, function(err, $) {
    //If there is an error, call the callback with the error
    if (err) {
      return callback(err);
    }
    var salary = $("#cotsyear_totals").find("td").eq(2).text();
    //console.log("Salary: " + salary);
    return callback(null,salary);
  })
}

//The code below will be run

var columns = 19;
// This variable should be automatically built
var rowIndex = {
  name: 1,
  position: 3,
  vorp: 16
}
var url = "/sortable/index.php?cid=1819072";
jQueryConnector(url, function (err, $) {
  var errMessage = "Error encountered when trying to get page html.";
  if (err) {
   console.log("Err: ", errMessage, " ... exiting");
   return;
  }
  //Select all table rows with the "TTdata" or "TTdata_ltgrey" classes
  var rowJQuerySelector = "tr.TTdata, tr.TTdata_ltgrey";
  //Save all rows to an array using jQuery
  var rows = $(rowJQuerySelector).toArray();
  parseTableRowsToPlayersObject(rows, $, function(err, players) {
    //Log all players
    //console.log(players);
    //For each player save salary
    async.each(players, function(player,done) {
      getPlayerSalary(player.url, function(err, salary) {
        player.salary = salary;
        done();
      });
    }, function(err) {
      console.log(players);
    });
  });
});