//function that creates an object with each position as an attribute and then
//iterates over each player adding them to the correct position object. 

var createPositionObject = function(playersObj){
    
    var positionObj = {};//will have attribute for each position (len 9)
    
    //iterate over each player in playersObj
    for(var name in playersObj){
        
        var playerPosition = playersObj[name].position;
        
        //check to see if player's position is an attribute in position obj
        if(!(playerPosition in positionObj)){
            
            //create object for that position within positionObj
            positionObj[playerPosition] = {};
        }
        
        //place player in proper position object
        positionObj[playerPosition][name] = {
            salary: playersObj[name].salary,
            vorp: playersObj[name].vorp
        }
        
    }
    return positionObj
}


//testing zone
var players = {
    Matt: {
        name:'Matt',
        salary:600000,
        vorp:5,
        position:'catcher'
    },
    Tom:{
        name:'Tom',
        salary:400000,
        vorp:2,
        position:'pitcher'
    },
    Bill:{
        name:'Bill',
        salary:500000,
        vorp:3,
        position:'pitcher'
    },
    Cindy:{
        name:'Cindy',
        salary:1000000,
        vorp:10,
        position:'Captain'
    }
    
}
var testObj = createPositionObject(players);

console.log(testObj);
