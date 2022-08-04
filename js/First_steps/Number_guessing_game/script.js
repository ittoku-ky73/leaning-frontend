const numberGuessingGame = document.querySelector('.number-guessing-game');
const screen = document.querySelector('.number-guessing-game .screen');
const guessField = document.getElementById('guessField');
const guessSubmit = document.querySelector('.number-guessing-game .guessSubmit');
const guessRange = document.querySelector('.number-guessing-game .range');
const guessRemain = document.querySelector('.number-guessing-game .remaining');
const guessRecord = document.querySelector('.number-guessing-game .recording');

const MIN_GUESS_NUMBER = 10;
const MAX_GUESS_NUMBER = 1000;
const MAX_REMAIN_COUNT = 10;

let randomNumber = 0;
let guessCount = 0;

initializeGame();

guessSubmit.addEventListener('mouseup', checkGuess);
guessField.addEventListener('keyup', function (e) {
  if (e.key == 'Enter') {
    checkGuess();
  }
});

function checkGuess() {
  let userGuess = Number(guessField.value);

  // check number is within range
  if (userGuess < MIN_GUESS_NUMBER || userGuess > MAX_GUESS_NUMBER) {
    screen.textContent = `${userGuess} is out of range.`;
    return;
  }

  // check number in the range
  if (userGuess < randomNumber) {
    screen.textContent = `${userGuess} is small.`;
  }
  else if (userGuess > randomNumber) {
    screen.textContent = `${userGuess} is large.`
  }
  else if (userGuess == randomNumber) {
    gameClear();
    return;
  }

  guessRemain.textContent = `Remaining: ${--guessCount}`;
  guessRecord.textContent += `${userGuess}, `;

  if (guessCount <= 0) {
    gameOver();
    return;
  }

  guessField.focus();
}

function initializeGame() {
  guessRange.textContent = `Range: ${MIN_GUESS_NUMBER} ~ ${MAX_GUESS_NUMBER}`;
  guessRemain.textContent = `Remaining: ${MAX_REMAIN_COUNT}`;
  guessRecord.textContent = 'Guessing: ';
  screen.innerText = '\
    This is a game of guessing numbers.\n \
    you enter a number, you will get a hint as to whether the number is larger or smaller than the correct answer.\n \
    so use the hints to guess the correct number! \
  '

  randomNumber = getRandomArbitrary(MIN_GUESS_NUMBER, MAX_GUESS_NUMBER);
  guessCount = MAX_REMAIN_COUNT;

  guessSubmit.disabled = guessField.disabled = false;
  screen.classList = 'screen';
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function gameClear() {
  screen.innerText = `\
    Congratulations!\n\n \
    The correct answer was ${randomNumber}. \
  `
  screen.classList.add('gameclear');
  guessSubmit.disabled = guessField.disabled = true;
  guessField.blur();
  createPlayBtn();
}

function gameOver() {
  screen.innerText = `\
    Game Over ...\n\n \
    The correct answer was ${randomNumber}. \
  `
  screen.classList.add('gameover');
  guessSubmit.disabled = guessField.disabled = true;
  guessField.blur();
  createPlayBtn();
}

function createPlayBtn() {
  let playbtn = document.createElement('button');

  playbtn.textContent = 'Play again';
  playbtn.classList.add('playbtn');
  numberGuessingGame.appendChild(playbtn);

  playbtn.addEventListener('click', function () {
    initializeGame();

    playbtn.remove();
    guessField.focus();
  });
}
