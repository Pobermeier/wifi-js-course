/**
 * Draws a specified amount of random numbers from a specified pool of numbers. Basically this is a Lotto-function. Returns an array with the random numbers that have been drawn from the pool of available random numbers.
 * @param {Number} numbersToDraw How many numbers should be drawn from totalNumbers sample
 * @param {Number} totalNumbers The sample of total numbers that random numbers can be drawn from
 */
function lottoGen(numbersToDraw, totalNumbers) {
  const numbers = [];
  let random;

  for (let i = 0; i < numbersToDraw; i++) {
    do {
      random = getRandom(1, totalNumbers);
    } while (numbers.indexOf(random) !== -1);

    numbers.push(random);
  }

  return numbers;
}

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

module.exports = lottoGen;
