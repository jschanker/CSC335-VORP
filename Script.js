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
  //Select all table rows with the "TTdata" or "TTdata_ltgrey" classes
  var rowJQuerySelector = "tr.TTdata, tr.TTdata_ltgrey";
  if (err) {
   console.log("Err: ", errMessage, " ... exiting");
   return;
  }
  //Save all rows to an array using $
  var rows = $(rowJQuerySelector).toArray();
  //Create an object of player objects
  var playersObject = {};
  //Loop through each row and create player object
  rows.forEach(function(current){
    //Attach a function to each row to easily retireve cell text
    current.getCell = function(index) {
      //Returns the text at the cell specified by the index
      return $(current).find("td:eq(" + index + ")");
    };
    //Get the player's name cell
    var nameCell = current.getCell(rowIndex.name);
    //Get the player's personal url
    var playerURL = nameCell.find("a").prop("href");
    //Get the player's name
    var name = nameCell.text();
    //Create the new player object
    playersObject[name] = {
      url: playerURL,
      position: current.getCell(rowIndex.position).text(),
      vorp: current.getCell(rowIndex.vorp).text()
    };
  });
  //Log all players
  console.log(playersObject);
});