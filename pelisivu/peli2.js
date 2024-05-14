// Definition of variables.
var points = [0, 0];
var inputs = [0, 0];
var inp = 10;
var rounds = 1;
var logs = [];
var logNew = [0, 0];
var p1Strategy = 1;
var p2Strategy = 0;

// Functions for setting inputs based on player input, only used when player 1 is player controlled.
function setInput10() {
    inp=0;
    main2();
}

function setInput11() {
    inp=1;
    main2();
}

// Function for evaluating input based on given strategy. Parameter defines, which player should be considered.
// If more complex strategies are presented, need to break this into individual functions. 
function evalInp(playerNum) {
    returnValue=1;
    if (playerNum==1) {
        // Not used currently.
        if (p1Strategy==0) {
            inp = 0;
        } else {
            inp = 1;
        }
        returnValue = inp;
    } else {
        // Select input for bot-controlled player 2.
        if (p2Strategy==0) {
            // Always defect.
            inp = 0;
        } else {
            // Cooperate first round, subsequent rounds are always defect.
            if(rounds==1) {
                inp = 1;
            }
            else {
                inp = 0;
            }
        }
        returnValue = inp;
    }
    return returnValue;
}

// Functions for reloading page and closing the page.
function Retry() {
    location.reload();
}  
function Quit() {
    window.close();
}  

// Control function for beginning a new round.
function continuePlaying() {
    rounds = rounds+1;
    document.getElementById('demo1').innerHTML = `The game will continue... <br>Round ${rounds} <br>Player 1: Cooperate or defect?`;
    document.getElementById('B1').innerHTML = 'Cooperate';
    document.getElementById('B2').innerHTML = 'Defect';
    main1();
}

// Control function for round end. Commented section for testing log-files.
function stopPlaying() {
    document.getElementById('demo1').innerHTML = `Thanks for playing! <br> This game lasted for ${rounds} rounds<br> The final points are: <br>Player 1: ${points[0]} points; Player 2: ${points[1]} points.`;
    /*
    var outputText = `Log of points: <br> `;
    for (let i = 0; i < rounds; i++) {
        outputText = outputText.concat(`Round ${i+1}: ${logs[i]}<br>`);
    }
    document.getElementById('demo1').innerHTML = outputText;
    */
    document.getElementById('B1').onclick= Retry;
    document.getElementById('B2').onclick= Quit;
    document.getElementById('B1').innerHTML = 'Retry';
    document.getElementById('B2').innerHTML = 'Quit';
}

// Function for calculating points from the current round. Points are also added into the logs.
function calcPoints() {
    if ((inputs[0] + inputs[1]) % 2 === 0) {
        // Same inputs, can calculate based on the input number: cooperate for 2, defect for 1.
        points = [points[0] + inputs[0] + 1, points[1] + inputs[1] + 1];
        logNew = [inputs[0] + 1, inputs[1] + 1];
    } else {
        // Different inputs, 0 points for cooperate and 3 for defect.
        points = [points[0] + inputs[1] * 3, points[1] + inputs[0] * 3];
        logNew = [inputs[1] * 3, inputs[0] * 3];
    }
    // Push the points to logs as well.
    logs.push(logNew);
}
  
// Control cuntion for the "main menu", will be used for selecting the strategy later. Now can be used to start the game or quit.
function runGame() {
    document.getElementById('demo1').innerHTML = `Welcome to an interactive Prisoner's dilemma game! <br> Press 'Start game' to start a game or 'Quit' to close the game.`;
    document.getElementById('B1').innerHTML = 'Start game';
    document.getElementById('B2').innerHTML = 'Quit';
    document.getElementById("B1").onclick = selectStrategy;
    document.getElementById("B2").onclick = Quit;
} 

// Function to select the player 2 strategy at random. Currently using only 2 available strategies.
function selectStrategy() {
    p2Strategy = Math.floor(Math.random()*2);
    main1();
}
  
// First part of the main function, selecting player 1 input.
function main1() {
    document.getElementById('demo1').innerHTML = `Player 1: <br> Press 'Cooperate' or 'Defect'. <br> Player 2 strategy: ${p2Strategy}`;
    document.getElementById('B1').innerHTML = 'Cooperate';
    document.getElementById('B2').innerHTML = 'Defect';
    document.getElementById("B1").onclick = setInput11;
    document.getElementById("B2").onclick = setInput10;
}

// Second part of the main function, calculating points and selecting whether to continue playing or stopping.
function main2() {
    inputs[0]=inp;
    inputs[1]=evalInp(playerNum=2);
    calcPoints();
    if (inputs[1]==1) {
        document.getElementById('demo1').innerHTML = `Player 2 cooperated. <br> Current points: Player 1: ${points[0]} points; Player 2: ${points[1]} points<br> Continue playing?`;
    } else {
        document.getElementById('demo1').innerHTML = `Player 2 defected. <br> Current points: Player 1: ${points[0]} points; Player 2: ${points[1]} points<br> Continue playing?`;
    }
    document.getElementById('B1').innerHTML = 'Yes';
    document.getElementById('B2').innerHTML = 'No';
    document.getElementById("B1").onclick = continuePlaying;
    document.getElementById("B2").onclick = stopPlaying;
}

runGame();