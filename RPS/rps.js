let humanScore = 0;
let computerScore = 0;

// Set container for all game components.
const container = document.createElement('div');
container.style.backgroundColor = '#668068';
container.style.padding = '20px';
container.style.textAlign = 'center';
container.style.borderRadius = '10px';
document.body.appendChild(container);

// Set the game title.
const gameTitle = document.createElement('h1');
gameTitle.textContent = 'Rock Paper Scissors';
gameTitle.style.fontSize = '2em';
gameTitle.style.fontWeight = 'bold';
gameTitle.style.color = '#DFDAC8';
gameTitle.border = '1px solid white';
container.appendChild(gameTitle);

// Function to create a button.
function createButton(imageUrl, onClick) {
    const button = document.createElement('button');
    button.style.margin = '10px';
    button.style.padding = '10px';
    button.style.backgroundImage = `url(${imageUrl})`;
    button.style.backgroundSize = 'contain';
    button.style.backgroundRepeat = 'no-repeat';
    button.style.backgroundPosition = 'center';
    button.style.backgroundColor = 'transparent';
    button.style.border = 'none';
    button.style.width = '100px';
    button.style.height = '100px';
    button.addEventListener('click', onClick);
    return button;
}

// Function to update the score display.
function updateScoreDisplay() {
    const scoreText = document.getElementById('scoreText');
    if (!scoreText) {
        const newScoreText = document.createElement('p');
        newScoreText.id = 'scoreText';
        newScoreText.style.textAlign = 'center';
        newScoreText.textContent = `Human: ${humanScore} Computer: ${computerScore}`;
        newScoreText.style.color = '#DFDAC8';
        container.appendChild(newScoreText);
    } else {
        scoreText.textContent = `Human: ${humanScore} Computer: ${computerScore}`;
    }
}

// Function to handle the end of the game.
function checkGameEnd() {
    if (humanScore === 5) {
        alert('You win the game!');
        disableButtons();
    } else if (computerScore === 5) {
        alert('You lose the game!');
        disableButtons();
    }
}

// Function to disable all buttons.
function disableButtons() {
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
}

// Function to handle a round of the game.
function handleRound(humanChoice) {
    if (humanScore === 5 || computerScore === 5) {
        disableButtons();
        return;
    }
    const computerChoice = getComputerChoice();
    const result = playRound(humanChoice, computerChoice);
    const resultText = document.createElement('p');
    resultText.textContent = result;
    resultText.style.textAlign = 'center';
    resultText.style.color = '#DFDAC8';
    container.appendChild(resultText);
    updateScoreDisplay();
    checkGameEnd();
}

// Create buttons for rock, paper, and scissors.
const rockButton = createButton('res/gu.png', () => handleRound('rock'));
const paperButton = createButton('res/pa.png', () => handleRound('paper'));
const scissorsButton = createButton('res/choki.png', () => handleRound('scissors'));

rockButton
// Add buttons to the container.
const buttons = document.createElement('div');
buttons.style.display = 'flex';
buttons.style.justifyContent = 'center';
buttons.style.gap = '100px';
buttons.appendChild(rockButton);
buttons.appendChild(paperButton);
buttons.appendChild(scissorsButton);
container.appendChild(buttons);

// Function to get the computer's choice.
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

// Function to play a round of the game.
function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        return 'It is a tie!';
    } else if (
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'scissors' && computerChoice === 'paper') ||
        (humanChoice === 'paper' && computerChoice === 'rock')
    ) {
        humanScore++;
        return `You win! ${humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1)} beats ${computerChoice}`;
    } else {
        computerScore++;
        return `You lose! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${humanChoice}`;
    }
}