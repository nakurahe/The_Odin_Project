// rps.test.js
const { getComputerChoice, playRound } = require('./rps');

describe('getComputerChoice', () => {
    test('should return a valid choice', () => {
        const choices = ['rock', 'paper', 'scissors'];
        const choice = getComputerChoice();
        expect(choices).toContain(choice);
    });
});

describe('playRound', () => {
    test('should return a tie message when both choices are the same', () => {
        expect(playRound('rock', 'rock')).toBe('It is a tie!');
        expect(playRound('paper', 'paper')).toBe('It is a tie!');
        expect(playRound('scissors', 'scissors')).toBe('It is a tie!');
    });

    test('should return a win message when human wins', () => {
        expect(playRound('rock', 'scissors')).toBe('You win! Rock beats scissors');
        expect(playRound('paper', 'rock')).toBe('You win! Paper beats rock');
        expect(playRound('scissors', 'paper')).toBe('You win! Scissors beats paper');
    });

    test('should return a lose message when computer wins', () => {
        expect(playRound('rock', 'paper')).toBe('You lose! Paper beats rock');
        expect(playRound('paper', 'scissors')).toBe('You lose! Scissors beats paper');
        expect(playRound('scissors', 'rock')).toBe('You lose! Rock beats scissors');
    });
});