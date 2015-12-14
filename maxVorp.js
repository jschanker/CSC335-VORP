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
                console.log(player[vorp]);
                
                if(player.salary < budget && player.vorp > 0){
                    
                    delete positionObj[position];
                    vorpInArr += player.vorp;
                    var teamArr = [player].concat(maxVorp(positionObj,budget-player.salary,vorpInArr));
                    
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
