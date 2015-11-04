var jsdom = require("jsdom");

//Attaches and returns a reference to jQuery
function jsdomjQueryConnector(htmlURL, callback) {
  //Set the scripts to include jQuery
  var jsdomScripts = ["http://code.jquery.com/jquery.js"];
  jsdom.env(htmlURL, jsdomScripts, function (err, window) {
    //Callback only iwth the error if there is an error
    if (err) {
      callback(err);
    }
    //Set jQuery variable
    var jQuery = window.$;
    //Callback with jQuery
    callback(err, window, jQuery);
  });
}

function parseTableRowsToPlayersObject(rowArray, jQuery, callback) {
  var playersObject = {};
  rowArray.forEach(function(currentRow){
    //Attach a function to each row to easily retrieve cell text
    currentRow.getCell = function(index) {
      //Returns the text at the cell specified by the index
      return jQuery(currentRow).find("td:eq(" + index + ")");
    };
    //Get the player's name cell
    var nameCell = currentRow.getCell(rowIndex.name);
    //Get the player's personal url
    var playerURL = nameCell.find("a").prop("href");
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

//The code below will be run

var columns = 19;
// This variable should be automatically built
var rowIndex = {
  name: 1,
  position: 3,
  vorp: 16
}
var url = "http://www.baseballprospectus.com/sortable/index.php?cid=1819072";
jsdomjQueryConnector(url, function (err, window, $) {
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
    console.log(players);
  });
});