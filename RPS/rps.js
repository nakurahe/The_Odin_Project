let humanScore = 0;
let computerScore = 0;

// Set game title part.
const gameTitle = document.createElement('h1');
gameTitle.textContent = 'Rock Paper Scissors';
gameTitle.style.textAlign = 'center';
gameTitle.style.fontSize = '2em';
gameTitle.style.fontWeight = 'bold';
gameTitle.style.color = 'yellow';
container.appendChild(gameTitle);

// Set three buttons for rock, paper, and scissors.
const rockButton = document.createElement('button');
rockButton.textContent = 'Rock';
rockButton.style.margin = '10px';
rockButton.style.padding = '10px';
rockButton.style.backgroundColor = 'lightblue';
rockButton.style.border = 'none';
rockButton.style.borderRadius = '5px';
rockButton.addEventListener('click', () => {
    if (humanScore === 5 || computerScore === 5) {
        rockButton.disabled = true;
        paperButton.disabled = true;
        scissorsButton.disabled = true
        return;
    }
    const computerChoice = getComputerChoice();
    const result = playRound('rock', computerChoice);
    const resultText = document.createElement('p');
    resultText.textContent = result;
    resultText.style = 'text-align: center';
    document.body.appendChild(resultText);
    const scoreText = document.createElement('p');
    scoreText.textContent = 'Human: ' + humanScore + ' Computer: ' + computerScore;
    scoreText.style = 'text-align: center';
    document.body.appendChild(scoreText);
});

const paperButton = document.createElement('button');
paperButton.textContent = 'Paper';
paperButton.style.margin = '10px';
paperButton.style.padding = '10px';
paperButton.style.backgroundColor = 'green';
paperButton.style.border = 'none';
paperButton.style.borderRadius = '5px';
paperButton.addEventListener('click', () => {
    if (humanScore === 5 || computerScore === 5) {
        rockButton.disabled = true;
        paperButton.disabled = true;
        scissorsButton.disabled = true
    }
    const computerChoice = getComputerChoice();
    const result = playRound('paper', computerChoice);
    const resultText = document.createElement('p');
    resultText.textContent = result;
    resultText.style = 'text-align: center';
    document.body.appendChild(resultText);
    const scoreText = document.createElement('p');
    scoreText.textContent = 'Human: ' + humanScore + ' Computer: ' + computerScore;
    scoreText.style = 'text-align: center';
    document.body.appendChild(scoreText);
});

const scissorsButton = document.createElement('button');
scissorsButton.textContent = 'Scissors';
scissorsButton.style.margin = '10px';
scissorsButton.style.padding = '10px';
scissorsButton.style.backgroundColor = 'pink';
scissorsButton.style.border = 'none';
scissorsButton.style.borderRadius = '5px';
scissorsButton.addEventListener('click', () => {
    if (humanScore === 5 || computerScore === 5) {
        rockButton.disabled = true;
        paperButton.disabled = true;
        scissorsButton.disabled = true
    }
    const computerChoice = getComputerChoice();
    const result = playRound('scissors', computerChoice);
    const resultText = document.createElement('p');
    resultText.textContent = result;
    resultText.style = 'text-align: center';
    document.body.appendChild(resultText);
    const scoreText = document.createElement('p');
    scoreText.textContent = 'Human: ' + humanScore + ' Computer: ' + computerScore;
    scoreText.style = 'text-align: center';
    document.body.appendChild(scoreText);
});

if (humanScore === 5) {
    alert('You win the game!');
} else if (computerScore === 5) {
    alert('You lose the game!');
}

const buttons = document.createElement('div');
buttons.style.display = 'flex';
buttons.style.justifyContent = 'center';
buttons.appendChild(rockButton);
buttons.appendChild(paperButton);
buttons.appendChild(scissorsButton);
document.body.appendChild(buttons);

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
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
