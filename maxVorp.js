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





var positionObj = {
    "pitchers": {
        "Matt": {
            
            "salary":500,
            "vorp":30
        },
        "Ben": {
            "salary":400,
            "vorp":25
        }
    },
    "catchers":{
        "Carly":{
            "salary":600,
            "vorp":40
        },
        "Bill":{
            "salary":200,
            "vorp":-1
        }
    }
};



console.log(maxVorpFunc(positionObj,1000));
console.log(maxVorpFunc(positionObj,2000));
