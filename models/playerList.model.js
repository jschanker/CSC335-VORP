/**
 * Dependencies
 */
var cheerio = require("cheerio");
var request = require("request");

/**
 * Constants
 */
//Player List URL
var url = "http://www.baseballprospectus.com/sortable/index.php?cid=1819072";

var Model = module.exports = {};

/**
 * Functions
 */
//Attaches and returns a reference jQuery as well as html
function jQueryConnector(url, callback) {
  //console.log(url)
  request(url, function (err, response, html) {
    //Callback only with the error if there is an error
    if (err) {
      return callback(err);
    }
    //Create jQuery from cheerio
    var jQuery = cheerio.load(html);
    //Callback with jQuery
    return callback(err, jQuery);
  });
}

function parseTableRowsToPlayersObject(rowArray, jQuery, callback) {
  var playersObject = {};
  rowArray.forEach(function (currentRow) {
    //Attach a function to each row to easily retrieve cell text
    currentRow.getCell = function (index) {
      //Returns the text at the cell specified by the index
      return jQuery(currentRow).find("td").eq(index);
    };
    //Get the player's name cell
    var nameCell = currentRow.getCell(rowIndex.name);
    //Get the player's name
    var name = nameCell.text();
    //Create the new player object
    playersObject[name] = {
      position: currentRow.getCell(rowIndex.position).text(),
      vorp: currentRow.getCell(rowIndex.vorp).text()
    };
  });
  return callback(null, playersObject);
}


// This variable should be built automatically
var rowIndex = {
  name: 1,
  position: 3,
  vorp: 16
};
Model.getAllPlayers = function (callback) {
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
    return parseTableRowsToPlayersObject(rows, $, callback);
  });
};