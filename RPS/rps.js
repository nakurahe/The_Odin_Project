const exp = require("constants");

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function getHumanChoice() {
    let choices = prompt('Enter your choice: rock, paper, or scissors').toLowerCase();
    while (choices !== 'rock' && choices !== 'paper' && choices !== 'scissors') {
        choices = prompt('Invalid choice. Enter your choice: rock, paper, or scissors').toLowerCase();
    }
    return choices;
}

const playRound = (humanChoice, computerChoice) => {
    if (humanChoice === computerChoice) {
        return 'It is a tie!';
    } else if (humanChoice === 'rock' && computerChoice === 'scissors' || humanChoice === 'scissors' && computerChoice === 'paper' || humanChoice === 'paper' && computerChoice === 'rock') {
        humanScore++;
        return 'You win! ' + humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1) + ' beats ' + computerChoice;
    } else {
        computerScore++;
        return 'You lose! ' + computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1) + ' beats ' + humanChoice;
    }
}

function playGame() {
    for (let i = 0; i < 5; i++) {
        const humanChoice = getHumanChoice();
        const computerChoice = getComputerChoice();
        console.log(playRound(humanChoice, computerChoice));
    }
    if (humanScore > computerScore) {
        console.log('You win! ' + humanScore + ' to ' + computerScore);
    } else if (humanScore < computerScore) {
        console.log('You lose! ' + computerScore + ' to ' + humanScore);
    } else {
        console.log('It is a tie! ' + humanScore + ' to ' + computerScore);
    }
}

module.exports = { getComputerChoice, playRound};