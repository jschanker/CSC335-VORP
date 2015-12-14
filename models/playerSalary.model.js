/**
 * Dependencies
 */
var request = require("request");

/**
 * Constants
 */
//Replace Constant
var replaceConstant = "#replaceMe";
//URL to post to when getting the player salary
var salaryURL = "http://sports.newsday.com/_common/php/templates/modular/v1-1/table";
//The post body when getting the player salary
var salaryPostBody = "options%5Btarget%5D=%23sdbTableWrapper&options%5Btype%5D=table&options%5Bsource%5D%5Btype%5D=MySQL&options%5Bsource%5D%5Bid%5D=05f93ab6c67a&options%5Bsort%5D%5Bcolumn%5D=salary&options%5Bsort%5D%5Bdescending%5D=true&options%5Bpagination%5D%5BperPage%5D=50&options%5Bpagination%5D%5Btarget%5D=main+.count&options%5Bpagination%5D%5BcountType%5D=page&options%5Btemplate%5D%5BheaderRow%5D=%3Cth+data-column%3D%22player%22%3E%3Ca+href%3D%22%22%3E%7Bplayer%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22team%22%3E%3Ca+href%3D%22%22%3E%7Bteam%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22position%22%3E%3Ca+href%3D%22%22%3E%7Bposition%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22salary%22%3E%3Ca+href%3D%22%22%3E%7Bsalary%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22age%22%3E%3Ca+href%3D%22%22%3E%7Bage%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22division%22%3E%3Ca+href%3D%22%22%3E%7Bdivision%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22league%22%3E%3Ca+href%3D%22%22%3E%7Bleague%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22state%22%3E%3Ca+href%3D%22%22%3E%7Bstate%7D%3C%2Fa%3E%3C%2Fth%3E&options%5Btemplate%5D%5Brow%5D=%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bplayer%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bteam%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bposition%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%24%7Bsalary%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bage%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bdivision%7D%3C%2Fa%3E%3C%2Ftd%3E%0D%0A%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bleague%7D%3C%2Fa%3E%3C%2Ftd%3E%0D%0A%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bstate%7D%3C%2Fa%3E%3C%2Ftd%3E&options%5Bcolumns%5D%5Bplayer%5D%5Bdisplay%5D=Player&options%5Bcolumns%5D%5Bteam%5D%5Bdisplay%5D=Team&options%5Bcolumns%5D%5Bposition%5D%5Bdisplay%5D=Position&options%5Bcolumns%5D%5Bsalary%5D%5Bdisplay%5D=Salary&options%5Bcolumns%5D%5Bsalary%5D%5Bnumeric%5D=true&options%5Bcolumns%5D%5Bage%5D%5Bdisplay%5D=Age&options%5Bcolumns%5D%5Bage%5D%5Bnumeric%5D=true&options%5Bcolumns%5D%5Bdivision%5D%5Bdisplay%5D=Division&options%5Bcolumns%5D%5Bleague%5D%5Bdisplay%5D=League&options%5Bcolumns%5D%5Bstate%5D%5Bdisplay%5D=State&options%5Bform%5D=form%5Bname%3D%22sdbForm%22%5D&options%5BtopList%5D=%23sdbTopFive&options%5Bfilters%5D=false&options%5BmobileStyle%5D=fixed+left+column&options%5Boffset%5D=0&template%5BheaderRow%5D=%3Cth+data-column%3D%22player%22%3E%3Ca+href%3D%22%22%3E%7Bplayer%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22team%22%3E%3Ca+href%3D%22%22%3E%7Bteam%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22position%22%3E%3Ca+href%3D%22%22%3E%7Bposition%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22salary%22%3E%3Ca+href%3D%22%22%3E%7Bsalary%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22age%22%3E%3Ca+href%3D%22%22%3E%7Bage%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22division%22%3E%3Ca+href%3D%22%22%3E%7Bdivision%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22league%22%3E%3Ca+href%3D%22%22%3E%7Bleague%7D%3C%2Fa%3E%3C%2Fth%3E%0D%0A%3Cth+data-column%3D%22state%22%3E%3Ca+href%3D%22%22%3E%7Bstate%7D%3C%2Fa%3E%3C%2Fth%3E&template%5Brow%5D=%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bplayer%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bteam%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bposition%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%24%7Bsalary%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bage%7D%3C%2Fa%3E%3C%2Ftd%3E%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bdivision%7D%3C%2Fa%3E%3C%2Ftd%3E%0D%0A%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bleague%7D%3C%2Fa%3E%3C%2Ftd%3E%0D%0A%3Ctd%3E%3Ca+href%3D%22%22+class%3D%22filter%22%3E%7Bstate%7D%3C%2Fa%3E%3C%2Ftd%3E&sort%5Bcolumn%5D=salary&sort%5Bdescending%5D=true&pagination%5Btarget%5D=main+.count&search%5Bplayer%5D=" + replaceConstant + "&searchTypes%5Bplayer%5D=partial";

var Model = module.exports = {};

Model.getPlayerSalary = function (playerName, callback) {
  //Must encode the name before using it. Also spaces in the name should be encoded with a plus sign
  var encodedName = encodeURIComponent(playerName).replace("%20", "+");
  //Plug in the name to the post body
  var postBody = salaryPostBody.replace(replaceConstant, encodedName);
  //Post to the external salary API
  request.post(salaryURL, {form: postBody}, function (err, response, body) {
    if (err) {
      return callback(err);
    }
    //The body comes back as a string of JSON. Must parse it into an object
    var data = JSON.parse(body);
    //Get the salary of the first player
    var salary = data.rows[0] ? data.rows[0].salary : undefined;
    if (data.rows.length > 1) {
      console.log("More than one player found");
    }
    return callback(null, salary);
  });
};