function maxVORP(playerInfo,amountOfMoney,positionFilled=[],playersGiveMVORP=[]){
    var copyOfPlayerInfo=[];
    for (var player in playerInfo){
        copyOfPlayerInfo.push(playerInfo[player]);
    }
    var mVORP=0;
    for (var key in copyOfPlayerInfo){
        if (!(copyOfPlayerInfo[key].position in positionFilled)){
            if (copyOfPlayerInfo[key].salary<=amountOfMoney){
                copyOfPlayerInfo.remove(copyOfPlayerInfo[key]);
                if (mVORP <= maxVORP(copyOfPlayerInfo,amountOfMoney-playerInfo[key].salary,positionFiled.push(playerInfo[key].position),playersGiveMVORP.push(key))+playerInfo[key].vorp){
                    mVORP = maxVORP(copyOfPlayerInfo,amountOfMoney-playerInfo[key].salary,positionFiled.push(playerInfo[key].position),playersGiveMVORP.push(key))+playerInfo[key].vorp;
                }
            }
        }
    }
    return playersGiveMVORP;
}
