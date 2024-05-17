/* -----------------------------
--- Definition of variables. ---
----------------------------- */

var points = [0, 0];
var inputs = [0, 0];
var inp = 10;
var rounds = 1;
var logs = [];
var logNew = [0, 0];
var p1Strategy = 0;
var p2Strategy = 0;
var finalRound = 1000;

/* --------------------------------------
--- Functions for strategy selection. ---
-------------------------------------- */

function setStrategy0() {
    p1Strategy = 0;
    main();
}

function setStrategy1() {
    p1Strategy = 1;
    main();
}

function setStrategy2() {
    p1Strategy = 2;
    main();
}

/* -----------------------------------------------------------
--- Functions for individual strategies to evaluate input. ---
----------------------------------------------------------- */

/* -------------------
--- Always defect. ---
------------------- */

function evalInput0(playerNum) {
    return 0;
}

/* ----------------------------------------------------------------
--- Cooperate first round, subsequent rounds are always defect. ---
---------------------------------------------------------------- */

function evalInput1(playerNum) {
    var returnValue = 0;
    if(rounds==1) {
        returnValue = 1;
    } else {
        returnValue = 0;
    }
    return returnValue;
}

/* ----------------------------------------------------------------
--- Cooperate unless opponent defected last round, then defect. ---
---------------------------------------------------------------- */

function evalInput2(playerNum) {
    var returnValue = 0;
    if (rounds==1) {
        returnValue = 1;
    } else if ((logs[rounds-2][2-playerNum]==3) || (logs[rounds-2][2-playerNum]==1)) {
        returnValue = 0;
    } else {
        returnValue = 1;
    }
    return returnValue;
}

/* -----------------------------------------------------------------------------------------------------------------
--- Function for evaluating input based on given strategy. Parameter defines, which player should be considered. ---
--- If more complex strategies are presented, need to break this into individual functions. ------------------------
----------------------------------------------------------------------------------------------------------------- */

function evalInp(playerNum) {
    returnValue=1;
    if (playerNum==1) {
        // Select input for player 1.
        if (p1Strategy==0) {
            inp = evalInput0(1);
        } else if (p1Strategy==1) {
            inp = evalInput1(1);
        } else {
            inp = evalInput2(1);
        }
        returnValue = inp;
    } else {
        // Select input for player 2.
        if (p2Strategy==0) {
            inp = evalInput0(2);
        } else if (p2Strategy==1) {
            inp = evalInput1(2);
        } else {
            inp = evalInput2(2);
        }
        returnValue = inp;
    }
    return returnValue;
}

/* -------------------------------------------------------
--- Functions for reloading page and closing the page. ---
------------------------------------------------------- */

function Retry() {
    location.reload();
}  
function Quit() {
    window.close();
}  

/* -----------------------------------------------------------------------------
--- Control function for round end. Commented section for testing log-files. ---
----------------------------------------------------------------------------- */

function stopPlaying() {
    document.getElementById('demo1').innerHTML = `Thanks for playing! <br> This game lasted for ${rounds} rounds<br> The final points are: <br>Player 1: ${points[0]} points; Player 2: ${points[1]} points.`;
    // This is for testing logs.
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
    document.getElementById('B3').style.display = "none";
}

/* -------------------------------------------------------------------------------------------------
--- Function for calculating points from the current round. Points are also added into the logs. ---
------------------------------------------------------------------------------------------------- */

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
  
/* -----------------------------------------
--- Control cuntion for the "main menu". ---
----------------------------------------- */

function runGame() {
    document.getElementById('demo1').innerHTML = `Welcome to an interactive Prisoner's dilemma game! <br> Press 'Start game' to start a game or 'Quit' to close the game.`;
    document.getElementById('B1').innerHTML = 'Start game';
    document.getElementById('B2').innerHTML = 'Quit';
    document.getElementById('B3').style.display = "block";
    document.getElementById('B3').style.display = "none";
    document.getElementById("B1").onclick = selectStrategy;
    document.getElementById("B2").onclick = Quit;
} 

/* --------------------------------------------------------------------------------------
--- Control function for selecting strategy. Player 2 strategy is selected at random. ---
-------------------------------------------------------------------------------------- */

function selectStrategy() {
    p2Strategy = Math.floor(Math.random()*3);
    finalRound = finalRound + Math.floor((Math.random()-0.5)*10);
    document.getElementById('demo1').innerHTML = `Select strategy to use. <br> Always defect means you will defect regardless of opponent action. <br> Sneaky defect will cooperate once, then defect always. <br> 
                                                  Tit for tat will cooperate unless opponent defected last round, in which case it will defect.`;
    document.getElementById('B1').innerHTML = 'Always defect';
    document.getElementById('B2').innerHTML = 'Sneaky defect';
    document.getElementById('B3').innerHTML = 'Tit for tat';
    document.getElementById('B3').style.display = "block";
    document.getElementById("B1").onclick = setStrategy0;
    document.getElementById("B2").onclick = setStrategy1; 
    document.getElementById("B3").onclick = setStrategy2; 
}
  
/* ---------------------------------------------------------
--- Main function, evaluate inputs and calculate scores. ---
--------------------------------------------------------- */  
  
function main() {
    inputs[0]=evalInp(playerNum=1);
    inputs[1]=evalInp(playerNum=2);
    calcPoints();
    if (rounds < finalRound) {
        rounds = rounds+1;
        main();
    } else {
        stopPlaying();
    }
}

// Run on page load
runGame();