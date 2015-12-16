
    

var maxVorp = function(positionObj,budget,vorpInArr){
    
    //base case
    if(Object.keys(positionObj).length === 0){
        return [];
    }
    else{
        var maxVorpSoFar = -Infinity;
        var maxVorpTeamArr;
        //
        for(var position in positionObj){
            
            for(var player in positionObj[position]){
                //console.log(positionObj[position][player].salary);
                
                if(positionObj[position][player].salary < budget && positionObj[position][player].vorp > 0){
                    
                    
                    var teamArr = [player];
                    var newBudget = budget-positionObj[position][player].salary
                    vorpInArr += positionObj[position][player].vorp;
                    delete positionObj[position];
                    
                    teamArr = teamArr.concat(maxVorp(positionObj,newBudget,vorpInArr));
                    console.log(teamArr);
                    //compare
                    if(vorpInArr > maxVorpSoFar){
                        maxVorpSoFar = vorpInArr;
                        maxVorpTeamArr = teamArr;
                    }
                    
                }
                   
                    
            }
                
        }
        
        return vorpInArr;
        
    }
    
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

console.log(maxVorp(positionObj,1000,0));

