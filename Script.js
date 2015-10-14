var jsdom = require("jsdom");

function getPlayerRows() { 
	jsdom.env(
	  "http://www.baseballprospectus.com/sortable/index.php?cid=1819072",
	  ["http://code.jquery.com/jquery.js"],
	  function (err, window) {
	  	return window.$(".TTdata, .TTdata_ltgrey");
	  }
	);
}