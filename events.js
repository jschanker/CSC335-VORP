var computeButton = document.getElementById("computeButton");

// create player object function: Takes data and puts into objects with the name of player as key
var createPlayersObject = function(rawData){
    
    var splitData = rawData.split(/=+/);
    var vorpData = splitData[0].split('\n');
    var salaryData = splitData[1];
    
    var playersObject = {};

    for(var i = 0; i < vorpData.length;i++){
        var playerName = vorpData[i].split('\t');
        var playerIndexInSalaryData = salaryData.indexOf(playerName[1]);
        var playerSalary = "";
        
        //check if salary is listed
        if (playerIndexInSalaryData === -1){
            playerSalary = 'null';
        } 
        else {
            
            //remove '$' and ','
            var dollarSignIndex = salaryData.indexOf("$", playerIndexInSalaryData);
            playerSalary = salaryData.substring(dollarSignIndex + 1, salaryData.indexOf('\t', dollarSignIndex));
            playerSalary = parseInt(playerSalary.replace(/,/g,''));
            
        

             playersObject[playerName[1]] =
            {
                vorp: parseFloat(playerName[16]),
                position: playerName[3],
                salary: playerSalary
            };

        }
    }
    return playersObject;
};

    
var createPositionObject = function(playersObject){
    
    var positionsObject = {};//will have attribute for each position (len 9)
    
    //iterate over each player in positionsObject
    for(var name in playersObject){
        
        var playerPosition = playersObject[name].position;
        
        //check to see if player's position is an attribute in positionsObject
        if(!(playerPosition in positionsObject)){
            
            //create object for that position within positionsObject
            positionsObject[playerPosition] = {};
        }
        
        //place player in proper position object
        positionsObject[playerPosition][name] = {
            salary: playersObject[name].salary,
            vorp: playersObject[name].vorp
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
    //get data
    var rawData = (document.getElementById("player-data").value);
	var objectOfPlayers = createPlayersObject(rawData);
	var objectOfPositions = createPositionObject(objectOfPlayers);
    

	var theBudget=Number(prompt("Please enter a budget amount",3000000));
	var answer = maxVorpFunc(objectOfPositions,theBudget);
	alert(JSON.stringify(answer, null, 4));
	
});


