var computeButton = document.getElementById("computeButton");

// Below are the array indices of significant data from the website containing each player's vorp after splitting the string:
// Player = 1, Position = 3, VORP = 16

computeButton.addEventListener("click", function() {
	var data = (document.getElementById("player-data").value);
    var players = data.split('\n');
    var player_object = {};
    var test_alert_string = "";

    for(var i = 0; i < players.length;i++){
        var specific_player = players[i].split('\t');

        player_object[specific_player[1]] = {
            vorp: specific_player[16],
            position: specific_player[3]
        };

        test_alert_string += (
            specific_player[1] + ':    ' +
            "VORP = " + specific_player[16] + '    ' +
            "Position = " + specific_player[3] + '\n'
        );
    }

    alert(test_alert_string);


});



