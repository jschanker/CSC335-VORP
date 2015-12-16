
    

var maxVorp = function(positionObj,budget){
    
    var posObj = positionObj;
    
    if(Object.keys(posObj).length === 0){
        return [];
    }
    else{
        var arrayOfPositions = Object.keys(posObj);
        var position = Object.keys(posObj).length-1;
        
        
        for(var player in posObj[arrayOfPositions[position]]){
            
            //get player vorp and salary
            var playerVorp = posObj[arrayOfPositions[position]][player].vorp;
            var playerSalary = posObj[arrayOfPositions[position]][player].salary
            
            
            //check budget and vorp
            if(playerSalary <= budget && playerVorp > 0){
                
                delete posObj[arrayOfPositions[position]]
                console.log(player);
                
                var teamArr = [player].concat(maxVorp(posObj,budget-playerSalary));
            }
            
        }
    }
}





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

console.log(maxVorp(positionObj,1000));
