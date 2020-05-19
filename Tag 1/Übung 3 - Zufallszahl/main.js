class NumberGuesserGame {
  initialState = {
    numberOfGuesses: 0,
    gameIsRunning: false,
    numberToGuess: null,
  };

  constructor(uiRef = null) {
    this.state = this.initialState;
    this.ui = uiRef;
    console.log('Game initialized!', this.state);
  }

  checkNumber(numberToCheck) {
    if (this.state.gameIsRunning && this.state.numberToGuess) {
      if (numberToCheck === this.state.numberToGuess) {
        console.log(this.state);
        console.log(
          'You guessed right! Number of guesses it took you: ' +
            this.state.numberOfGuesses,
        );
        this.ui &&
          this.ui.setAlert(
            'You guessed right! Number of guesses it took you: ' +
              this.state.numberOfGuesses,
            'success',
          );
        this.resetGame();
      } else {
        this.incrementGuesses();
        console.log('Wrong number! Guess again!', this.state);
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
      console.log('Game has started', this.state);
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
    this.state = this.initialState;
    setTimeout(() => {
      this.ui && this.ui.resetUi();
      this.startGame();
    }, 2000);
  }
}

class UserInterface {
  constructor(form, numberInput, output, numberOfGuesses) {
    this.form = form;
    this.numberInput = numberInput;
    this.output = output;
    this.numberOfGuesses = numberOfGuesses;
  }

  setAlert(text, cssClass) {
    this.clearAlert();
    this.output.classList.remove('hidden');
    this.output.classList.add(cssClass);
    this.output.innerText = text;

    setTimeout(() => {
      this.clearAlert();
    }, 2000);
  }

  setNumberOfGuesses(numberOfGuesses) {
    this.numberOfGuesses.innerText = numberOfGuesses.toString();
  }

  resetUi() {
    this.setNumberOfGuesses(0);
    setTimeout(() => {
      this.clearAlert();
    }, 2000);
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

  const ui = new UserInterface(form, numberInput, output, numberOfGuesses);
  const game = new NumberGuesserGame(ui);

  game.startGame();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(numberInput.value);
    game.checkNumber(+numberInput.value);
    numberInput.value = '';
    numberInput.focus();
  });
})();
