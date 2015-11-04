var computeButton = document.getElementById("computeButton");
computeButton.addEventListener("click", function() {
	    var rawData = (document.getElementById("player-data").value);
	    alert(rawData);
	      });
eachLineIsValueInArray=rawData.split("\n");//Each player & their info==1 value in array
players={};
playerName=null;
for(var i=0;i<eachLineIsValueInArray.length;i++){
    var personsInfoIsValueInArray=eachLineIsValueInArray[i].split("\t");
    playerName=personsInfoIsValueInArray[0];
    players[playerName]={};
    //Array within array. In each inner array, each piece of info is one value.
    //personsInfoIsValueInArray.forEach(function(value,index){
    players[playerName].position=personsInfoIsValueInArray[2];
    players[playerName].vorp=Number(personsInfoIsValueInArray[13]);
        if(personsInfoIsValueInArray[3].includes("$")){
            //Wow. such money. much tedious. very spook. wow
            var removeDollarSign=personsInfoIsValueInArray[3].split(",").join('');
            var removeCommas=removeDollarSign.split("$").join('');
            var convertStringToNumber=Number(removeCommas);
            players[playerName].salary=convertStringToNumber;
            //Thnk u ( ͡° ͜ʖ ͡ °)
        }
    }
