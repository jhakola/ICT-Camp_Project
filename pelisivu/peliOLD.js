var points = [0, 0];
var inputs = [0, 0];
var inp = 10;
var rounds = 1;
var logs = [];

function setInput10() {
    inp=0;
    main2();
}

function setInput11() {
    inp=1;
    main2();
}

function setInput20() {
    inp=0;
    main3();
}

function setInput21() {
    inp=1;
    main3();
}  
function Retry() {
    location.reload();
}  
function Quit() {
    window.close();
}  

function continuePlaying() {
    rounds = rounds+1;
    document.getElementById('demo1').innerHTML = `The game will continue... <br>Round ${rounds} <br>Player 1: Cooperate or defect?`;
    document.getElementById('B1').innerHTML = 'Cooperate';
    document.getElementById('B2').innerHTML = 'Defect';
    main1();
}

function stopPlaying() {
    document.getElementById('demo1').innerHTML = `Thanks for playing! <br> This game lasted for ${rounds} rounds<br> The final points are: <br>Player 1: ${points[0]} points; Player 2: ${points[1]} points`;
    /* var outputText = `Log of points: <br> `;
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

function calcPoints() {
    if ((inputs[0] + inputs[1]) % 2 === 0) {
        points = [points[0] + inputs[0] + 1, points[1] + inputs[1] + 1];
    } else {
        points = [points[0] + inputs[1] * 3, points[1] + inputs[0] * 3];
    }
    logs.push(points);
}
  
function main1() {
    document.getElementById("B1").onclick = setInput11;
    document.getElementById("B2").onclick = setInput10;
}

function main2() {
    document.getElementById('demo1').innerHTML = `Player 2: Cooperate or defect?`;
    inputs[0]=inp;
    document.getElementById("B1").onclick = setInput21;
    document.getElementById("B2").onclick = setInput20;
}

function main3() {
    inputs[1]=inp;
    calcPoints();
    document.getElementById('demo1').innerHTML = `Current points: <br>Player 1: ${points[0]} points; Player 2: ${points[1]} points<br> Continue playing?`;
    document.getElementById('B1').innerHTML = 'Yes';
    document.getElementById('B2').innerHTML = 'No';
    document.getElementById("B1").onclick = continuePlaying;
    document.getElementById("B2").onclick = stopPlaying;
}

main1();