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
