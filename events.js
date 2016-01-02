var computeButton = document.getElementById("computeButton");
var createPlayerObject = function(rawData){
    //Seperate lines into own array
    lineArr=rawData.split(/\r\n|\r|\n/);//Each player & their info==1 value in array
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
        
                
        if(playerInfoArr[3].includes("$")){
            //Wow. such money. much tedious. very spook. wow
            //convert salary from string to number
            var removeSign = playerInfoArr[3].split(",").join('');
            var removeCommas=removeSign.split("$").join('');
            var salAsNum=Number(removeCommas);
            players[playerName].salary=salAsNum;
            //Thnk u ( ͡° ͜ʖ ͡ °)
        }
    }return players;
};
    
var createPositionObject = function(players){
    
    var positionsObject = {};//will have attribute for each position (len 9)
    
    //iterate over each player in positionsObject
    for(var name in positionsObject){
        
        var playerPosition = positionsObject[name].position;
        
        //check to see if player's position is an attribute in positionsObject
        if(!(playerPosition in positionsObject)){
            
            //create object for that position within positionsObject
            positionsObject[playerPosition] = {};
        }
        
        //place player in proper position object
        positionsObject[playerPosition][name] = {
            salary: positionsObject[name].salary,
            vorp: positionsObject[name].vorp
        };
        
    }
    return positionsObject;
};
    
    
var maxVorpFunc = function(positionsObject,budget){
    
    var results = {
        vorp:0,
        team:{}
    };
        
    var arrayOfPositions = Object.keys(positionsObject);
    var position = Object.keys(positionsObject).length-1;
    var firstPosition = arrayOfPositions[0];
    
    if(firstPosition){    
        var posObjCopy = {};
        for(var pos in positionsObject){
            posObjCopy[pos] = positionsObject[pos];
        } 
        
        delete posObjCopy[firstPosition];
    
        results = maxVorpFunc(posObjCopy,budget);
        for(var player in positionsObject[firstPosition]){
            //get player vorp and salary
            var playerName = positionsObject[firstPosition][player];
            var playerVorp = positionsObject[firstPosition][player].vorp;
            var playerSalary = positionsObject[firstPosition][player].salary;
            
            //check budget and vorp
            if(playerSalary <= budget && playerVorp > 0){
                var newBudget = budget - playerSalary;
                var resultsSoFar = maxVorpFunc(posObjCopy,newBudget);//add player to team and add player vorp to count
                resultsSoFar.vorp += playerVorp;
                resultsSoFar.team[player] = playerName;
                
                //resultsSoFar.team[playerName] = playerName;
                //compare vorp
                if(resultsSoFar.vorp > results.vorp){
                    results.vorp = resultsSoFar.vorp;
                    results.team = resultsSoFar.team;
                    
                }     
            }
               
        }
        
    }return results;
};
    
    
//Event handler for button

computeButton.addEventListener("click", function() {
    	var rawData = (document.getElementById("player-data").value);
	var theBudget=Number(prompt("Please enter a budget amount",3000000));
	
	var objectOfPlayers = createPlayerObject(rawData);
	var objectOfPositions = createPositionObject(objectOfPlayers);
	var answer = maxVorpFunc(objectOfPositions,theBudget);
	
	alert(JSON.stringify(answer));
});
