class NumberGuesserGame {
  initialState = {
    numberOfGuesses: 0,
    gameIsRunning: false,
    numberToGuess: null,
  };

  constructor(uiRef = null) {
    this.state = this.initialState;
    this.ui = uiRef;
  }

  checkNumber(numberToCheck) {
    if (this.state.gameIsRunning && this.state.numberToGuess) {
      if (numberToCheck === this.state.numberToGuess) {
        this.ui &&
          this.ui.setAlert(
            'You guessed right! Number of guesses it took you: ' +
              this.state.numberOfGuesses +
              '. Restarting game!',
            'success',
          );
        this.resetGame();
      } else {
        this.incrementGuesses();
        this.ui && this.ui.setAlert('Wrong number! Guess again!', 'error');
      }
    }
  }

  startGame() {
    if (!this.state.gameIsRunning) {
      this.state = {
        ...this.state,
        gameIsRunning: true,
        numberToGuess: this.generateNumber(),
      };
      this.ui &&
        this.ui.setAlert(
          'Game has started! Guess a number between 1 and 10.',
          'success',
        );
    }
  }

  generateNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  incrementGuesses() {
    if (this.state.gameIsRunning) {
      this.state = {
        ...this.state,
        numberOfGuesses: this.state.numberOfGuesses + 1,
      };
      this.ui && this.ui.setNumberOfGuesses(this.state.numberOfGuesses);
    }
  }

  resetGame() {
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
}

class UserInterface {
  constructor(numberInput, output, numberOfGuesses, submitButton) {
    this.numberInput = numberInput;
    this.output = output;
    this.numberOfGuesses = numberOfGuesses;
    this.submitButton = submitButton;
  }

  setAlert(text, cssClass) {
    this.clearAlert();
    this.submitButton.disabled = true;
    this.output.classList.remove('hidden');
    this.output.classList.add(cssClass);
    this.output.innerText = text;

    setTimeout(() => {
      this.submitButton.disabled = false;
      this.clearAlert();
    }, 2000);
  }

  setNumberOfGuesses(numberOfGuesses) {
    this.numberOfGuesses.innerText = numberOfGuesses.toString();
  }

  clearAlert() {
    this.output.classList.remove('success');
    this.output.classList.remove('error');
    this.output.classList.add('hidden');
    this.output.innerText = '';
  }
}

(function App() {
  const form = document.getElementById('game-form');
  const numberInput = document.getElementById('guess-number');
  const output = document.getElementById('output');
  const numberOfGuesses = document.getElementById('number-of-guesses');
  const submitButton = document.querySelector('#game-form button');

  const ui = new UserInterface(
    numberInput,
    output,
    numberOfGuesses,
    submitButton,
  );
  const game = new NumberGuesserGame(ui);

  game.startGame();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    game.checkNumber(+numberInput.value);
    numberInput.value = '';
    numberInput.focus();
  });
})();
