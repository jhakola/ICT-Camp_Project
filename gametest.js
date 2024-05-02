// RemoveEventListener ei näytä toimivan, sen kun korjaa niin pitäs alkaa toimia?

class Dilemma {
    constructor() {
        this.points = [0, 0];
        this.inputs = [0, 0];
        this.rounds = 1;
        this.newRound();
    }
    
    player1Input (playerInput) {
        const inputs = this.getInputs();
        inputs[0] = playerInput;
        this.inputs = inputs;
        document.getElementById("B1").removeEventListener("click", () => this.player1Input(0));
        document.getElementById("B2").removeEventListener("click", () => this.player1Input(1));
        this.getPlayer2Input();
    }
    
    player2Input (playerInput) {
        const inputs = this.getInputs();
        inputs[1] = playerInput;
        this.inputs = inputs;
        document.getElementById("B3").removeEventListener("click", () => this.player2Input(0));
        document.getElementById("B4").removeEventListener("click", () => this.player2Input(1));    
        this.calculatePlayerPoints();
    }

    calcPoints() {
        const inputs = this.getInputs();
        const points = this.getPoints();
        if ((inputs[0] + inputs[1]) % 2 === 0) {
            this.points = [points[0] + inputs[0] + 1, points[1] + inputs[1] + 1];
        } else {
            this.points = [points[0] + inputs[1] * 3, points[1] + inputs[0] * 3];
        }
        document.getElementById("demo1").innerHTML = `The inputs given were as follows: ${this.getInputs()}`;
        document.getElementById("demo2").innerHTML = `The points are as follows: Player 1: ${this.getPoints()[0]}; Player 2: ${this.getPoints()[1]}`;
        this.evalContinue();
    }
    
    conInput(input) {
        if (input===0) {
            this.rounds = this.getRounds() + 1;
            document.getElementById("demo3").innerHTML = `Starting round ${this.getRounds()}`;
            this.newRound();
        } else {
            document.getElementById("demo1").innerHTML = `Thanks for playing!`;
            document.getElementById("demo2").innerHTML = `This iterative game lasted for ${this.getRounds()} rounds.`;
            document.getElementById("demo3").innerHTML = `The final points are as follows: ${this.getPoints()}`;
        }
    }
    
    getInputs() {
        return this.inputs;
    }

    getPoints() {
        return this.points;
    }

    getCon() {
        return this.con;
    }

    getRounds() {
        return this.rounds;
    }
    
    getTime () {
        return this.time;
    }
    	
    newRound() {
        document.getElementById("demo1").innerHTML = `Round ${this.getRounds()}`;
        this.getPlayer1Input();
    }
    
    getPlayer1Input() {
        document.getElementById("demo2").innerHTML = `Player 1: Press B1 to cooperate, B2 to defect`;
        document.getElementById("B1").addEventListener("click", () => this.player1Input(0));
        document.getElementById("B2").addEventListener("click", () => this.player1Input(1));
    }
    
    getPlayer2Input() {
        document.getElementById("demo1").innerHTML = `Input read: ${this.getInputs()[0]}`;
        document.getElementById("demo2").innerHTML = `Player 2: Press B3 to cooperate, B4 to defect`;
        document.getElementById("B3").addEventListener("click", () => this.player2Input(0));
        document.getElementById("B4").addEventListener("click", () => this.player2Input(1));
    }
    
    calculatePlayerPoints() {
        document.getElementById("demo1").innerHTML = `Calculating points...`;
        document.getElementById("demo2").innerHTML = `...`;
        this.calcPoints();
    }
    
    evalContinue() {
        document.getElementById("demo3").innerHTML = `Continue playing?`;
        document.getElementById("Yes").addEventListener("click", () => this.conInput(0));
        document.getElementById("No").addEventListener("click", () => this.conInput(1));
    }
}

const GAME = new Dilemma();