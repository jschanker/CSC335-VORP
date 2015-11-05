
//Event handler for button
var computeButton = document.getElementById("computeButton");
computeButton.addEventListener("click", function() {
	    var rawData = (document.getElementById("player-data").value);
	    alert(rawData);
});

//Seperate lines into own array
lineArr=rawData.split("\n");//Each player & their info==1 value in array
players={};
playerName=null;

//Seperate info for each player into arry
for(var i=0;i<lineArr.length;i++){
    var playerInfoArr=lineArr[i].split("\t");
    
    
    //create object with key of player name
    playerName=playerInfoArr[0];
    players[playerName]={};
    
    //set position attribute in player's object
    players[playerName].position = playerInfoArr[2];
    
    //set vorp attribute in player's object
    players[playerName].vorp=Number(playerInfoArr[13]);
        
        //Do we need this if statement? 
        if(playerInfoArr[3].includes("$")){
            //Wow. such money. much tedious. very spook. wow
            //convert salary from string to number
            var removeSign = playerInfoArr[3].split(",").join('');
            var removeCommas=removeSign.split("$").join('');
            var salAsNum=Number(removeCommas);
            players[playerName].salary=salAsNum;
            //Thnk u ( ͡° ͜ʖ ͡ °)
        }
    }
    
//Code Dump
//Array within array. In each inner array, each piece of info is one value.
    //playerInfoArr.forEach(function(value,index){
    
