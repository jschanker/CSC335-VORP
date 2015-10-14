var jsdom = require("jsdom");

function jsdomjQueryConnector(htmlURL, callback) {
  var jsdomScripts = ["http://code.jquery.com/jquery.js"];
  jsdom.env(htmlURL, jsdomScripts, callback);
}


// Run this code
var url = "http://www.baseballprospectus.com/sortable/index.php?cid=1819072";
jsdomjQueryConnector(url, function (err, window, callback) {
  var errMessage = "Error encountered when trying to get rows.";
  var rowJQuerySelector = ".TTdata, .TTdata_ltgrey";
  if (err) {
   console.log("Err: ", errMessage, " ... exiting");
   return;
  }
  window.$(rowJQuerySelector).each(function() {
    //Here you should process the data and write to a file or database
    console.log(this);
  });
});