let target;
let computerGuessValue;

const humanGuessInput = document.getElementById("human-guess");
const computerGuess = document.getElementById("computer-guess");
const roundNumber = document.getElementById("input-round");
const targetNumber = document.getElementById("input-target-number");
const computerScoreDsp = document.getElementById("computer-score");
const humanScoreDsp = document.getElementById("human-score");
const computerWinDsp = document.getElementById("computer-winner");

const guessButton = document.getElementById("guess");
const nextRound = document.getElementById("next-round");

const subButton = document.getElementById("subtract");
const addButton = document.getElementById("addition");
let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 0;
const handleValueChanges = value => {
    if (value > 0 && value < 9) {
        subButton.removeAttribute("disabled");
        addButton.removeAttribute("disabled");
    } else if (value <= 0) {
        subButton.setAttribute("disabled", true);
    } else if (value >= 9) {
        addButton.setAttribute("disabled", true);
    }
}



humanGuessInput.addEventListener("input", function (e) {
    handleValueChanges(e.target.value);
})
console.log(humanGuessInput.value);



addButton.addEventListener("click", () => {
    humanGuessInput.value++;
    handleValueChanges(humanGuessInput.value);
});
subButton.addEventListener("click", () => {

    humanGuessInput.value--;
    handleValueChanges(humanGuessInput.value);
});

const generateValue = () => {
    return Math.floor(Math.random() * 10);
}

const decideWinner = (a, b, c) => {
    if (getAbsoluteDistance(a, b, c)) {
        return true;
    } else {
        return false;
    }
}

const getAbsoluteDistance = (a, b, c) => {
    console.log(a);
    console.log(b);
    console.log(c);
    if ((a == b || a == c) || ((c - a) >= 0 && (c - b) >= 0 && (c - a) < (c - b)) || ((c - a) < 0 && (c - b) < 0 && (c - a) > (c - b)) || ((c - a) > 0 && (c - b) < 0)) {
        return true;
    }
    return false;


}

const updateScore = (result) => {
    return result === 'human' ? humanScore++ : computerScore++;
}

const advanceRound = () => {
    return currentRoundNumber++;
}

guessButton.addEventListener("click", () => {

    target = generateValue();
    computerGuessValue = Math.floor(Math.random() * 10);
    computerGuess.innerText = computerGuessValue;
    targetNumber.innerText = target;

    const humanIsWinner = decideWinner(humanGuessInput.value, computerGuessValue, target);
    const winner = humanIsWinner ? 'human' : 'computer';
    updateScore(winner);
    if (humanIsWinner) {
        guessButton.classList.toggle('winning-text');

        guessButton.innerText = "You won";
    }
    else {
        computerWinDsp.innerText = "Computer Won";
    }
    humanScoreDsp.innerText = humanScore;
    computerScoreDsp.innerText = computerScore;
    guessButton.setAttribute("disabled", true);
    nextRound.removeAttribute("disabled");
})


nextRound.addEventListener("click", () => {
    advanceRound();

    nextRound.setAttribute('disabled', true);
    guessButton.removeAttribute('disabled');
    roundNumber.innerText = currentRoundNumber;
    computerGuess.innerText = '?';
    targetNumber.innerText = '?';
    humanGuessInput.value = '';
    computerWinDsp.innerText = '';
    guessButton.classList.remove('winning-text');
    guessButton.innerText = 'Make a Guess';

})