const button = document.getElementById('getNumbersBtn');
const output = document.getElementById('output');

button.addEventListener('click', async () => {
  const numbers = await (
    await fetch('http://localhost:5001/getnumbers')
  ).json();

  output.innerHTML = '';

  numbers.forEach((number) => {
    output.innerHTML += `<span>${number}</span> `;
  });
});
