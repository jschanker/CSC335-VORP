/**
 * Dependencies
 */
var cheerio = require("cheerio");
var request = require("request");

/**
 * Constants
 */
//Replace Constant
var replaceConstant = "#replaceMe";
//Player List URL
var url = "http://www.baseballprospectus.com/sortable/index.php?cid=1819072";
//URL to post to when getting the player salary
var salaryURL = "http://sports.newsday.com/_common/php/templates/modular/v1-1/table";
//The post body when getting the player salary
var salaryPostBody = "options%5Btarget%5D=%23sdbTableWrapper&options%5Btype%5D=table&options%5Bsource%5D%5Btype%5D=MySQL&options%5Bsource%5D%5Bid%5D=05f93ab6c67a&options%5Bsort%5D%5Bcolumn%5D=salary&options%5Bsort%5D%5Bdescending%5D=true&options%5Bpagination%5D%5BperPage%5D=50&options%5Bpagination%5D%5Btarget%5D=main+.count&options%5Bpagination%5D%5BcountType%5D=page&options%5Btemplate%5D%5BheaderRow%5D=%3Cth+data-column%3D%22player%22%3E%3Ca+href%3D%22%22%3E%7Bplayer%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22team%22%3E%3Ca+href%3D%22%22%3E%7Bteam%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22position%22%3E%3Ca+href%3D%22%22%3E%7Bposition%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22salary%22%3E%3Ca+href%3D%22%22%3E%7Bsalary%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22age%22%3E%3Ca+href%3D%22%22%3E%7Bage%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22division%22%3E%3Ca+href%3D%22%22%3E%7Bdivision%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22league%22%3E%3Ca+href%3D%22%22%3E%7Bleague%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22state%22%3E%3Ca+href%3D%22%22%3E%7Bstate%7D%3C%2Fa%3E%3C%2Fth%3E&options%5Btemplate%5D%5Brow%5D=%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bplayer%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bteam%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bposition%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%24%7Bsalary%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bage%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bdivision%7D%3C%2Fa%3E%3C%2Ftd%3E%0D%0A%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bleague%7D%3C%2Fa%3E%3C%2Ftd%3E%0D%0A%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bstate%7D%3C%2Fa%3E%3C%2Ftd%3E&options%5Bcolumns%5D%5Bplayer%5D%5Bdisplay%5D=Player&options%5Bcolumns%5D%5Bteam%5D%5Bdisplay%5D=Team&options%5Bcolumns%5D%5Bposition%5D%5Bdisplay%5D=Position&options%5Bcolumns%5D%5Bsalary%5D%5Bdisplay%5D=Salary&options%5Bcolumns%5D%5Bsalary%5D%5Bnumeric%5D=true&options%5Bcolumns%5D%5Bage%5D%5Bdisplay%5D=Age&options%5Bcolumns%5D%5Bage%5D%5Bnumeric%5D=true&options%5Bcolumns%5D%5Bdivision%5D%5Bdisplay%5D=Division&options%5Bcolumns%5D%5Bleague%5D%5Bdisplay%5D=League&options%5Bcolumns%5D%5Bstate%5D%5Bdisplay%5D=State&options%5Bform%5D=form%5Bname%3D%22sdbForm%22%5D&options%5BtopList%5D=%23sdbTopFive&options%5Bfilters%5D=false&options%5BmobileStyle%5D=fixed+left+column&options%5Boffset%5D=0&template%5BheaderRow%5D=%3Cth+data-column%3D%22player%22%3E%3Ca+href%3D%22%22%3E%7Bplayer%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22team%22%3E%3Ca+href%3D%22%22%3E%7Bteam%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22position%22%3E%3Ca+href%3D%22%22%3E%7Bposition%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22salary%22%3E%3Ca+href%3D%22%22%3E%7Bsalary%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22age%22%3E%3Ca+href%3D%22%22%3E%7Bage%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22division%22%3E%3Ca+href%3D%22%22%3E%7Bdivision%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22league%22%3E%3Ca+href%3D%22%22%3E%7Bleague%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22state%22%3E%3Ca+href%3D%22%22%3E%7Bstate%7D%3C%2Fa%3E%3C%2Fth%3E&template%5Brow%5D=%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bplayer%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bteam%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bposition%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%24%7Bsalary%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bage%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bdivision%7D%3C%2Fa%3E%3C%2Ftd%3E%0D%0A%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bleague%7D%3C%2Fa%3E%3C%2Ftd%3E%0D%0A%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bstate%7D%3C%2Fa%3E%3C%2Ftd%3E&sort%5Bcolumn%5D=salary&sort%5Bdescending%5D=true&pagination%5Btarget%5D=main+.count&search%5Bplayer%5D=" + replaceConstant + "&searchTypes%5Bplayer%5D=partial";


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