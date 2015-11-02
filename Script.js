var jsdom = require("jsdom");

function jsdomjQueryConnector(htmlURL, callback) {
  var jsdomScripts = ["http://code.jquery.com/jquery.js"];
  jsdom.env(htmlURL, jsdomScripts, callback);
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
jsdomjQueryConnector(url, function (err, window, callback) {
  var errMessage = "Error encountered when trying to get rows.";
  var rowJQuerySelector = "tr.TTdata, tr.TTdata_ltgrey";
  if (err) {
   console.log("Err: ", errMessage, " ... exiting");
   return;
  }
  //Set jQuery variable alias
  var jQuery = window.$;
  //Save all rows to an array using jQuery
  var rows = jQuery(rowJQuerySelector).toArray();
  //Create an object of player objects
  var playersObject = {};
  //Loop through each row and create player object
  rows.forEach(function(current){
    //Attach a function to each row to easily retireve cell values
    current.getCellText = function(index) {
      //Returns the text at the cell specified by the index
      return jQuery(current).find("td:eq(" + index + ")").text();
    };
    //Get the player's name which is the 2nd cell
    var name = current.getCellText(rowIndex.name);
    //Create the new player object
    playersObject[name] = {
      position: current.getCellText(rowIndex.position),
      vorp: current.getCellText(rowIndex.vorp)
    };
  });
  //Log all players
  console.log(playersObject);
});