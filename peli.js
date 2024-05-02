class Dilemma {
    constructor() {
        this.points = [0, 0];
        this.inputs = [0, 0];
        this.rounds = 1;
        this.con = true;
        this.b = 1;
        this.newRound();
    }

    readInput(playerNum) {
        let flag = false;
        const inputs = this.getInputs();
        while (!flag) {
            console.log(`Enter the input for player ${playerNum + 1}:`)
            if (this.b==1) {
                flag = true;
                inputs[playerNum] = 0;
            }
            else {
                flag = true;
                inputs[playerNum] = 1;
            }
        }
        this.inputs = inputs;
    }

    calcPoints() {
        const inputs = this.getInputs();
        const points = this.getPoints();
        if ((inputs[0] + inputs[1]) % 2 === 0) {
            this.points = [points[0] + inputs[0] + 1, points[1] + inputs[1] + 1];
        } else {
            this.points = [points[0] + inputs[1] * 3, points[1] + inputs[0] * 3];
        }
    }

    readCon() {
        let flag = false;
        while (!flag) {
            document.getElementById("demo").innerHTML = 'Continue playing? ';
            if (this.b==1) {
                flag = true;
            } else {
                this.con = false;
                flag = true;
            }
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
	
    click1 () {
        this.b = 1;
    }
	
    click2 () {
        this.b = 2;
    }

    newRound() {
        document.getElementById("demo").innerHTML = 'NEW ROUND STARTING';
        document.getElementById("demo").innerHTML = `Round ${this.getRounds()}`;
        this.readInput(0);
        this.readInput(1);
        this.calcPoints();
        console.log(`Player 1 has ${this.getPoints()[0]} points!`);
        console.log(`Player 2 has ${this.getPoints()[1]} points!`);
        this.readCon();
        if (this.getCon()) {
            this.rounds = this.getRounds() + 1;
            this.newRound();
        } else {
            console.log();
            console.log("Thanks for playing!");
            console.log(`This iterative game lasted for ${this.getRounds()} rounds.`);
            console.log("The final points are as follows:");
            console.log(`Player 1 has ${this.getPoints()[0]} points!`);
            console.log(`Player 2 has ${this.getPoints()[1]} points!`);
        }
    }
}

const GAME = new Dilemma();