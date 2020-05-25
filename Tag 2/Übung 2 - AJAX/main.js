(async function Main() {
  const data = await (
    await fetch('http://wifiweb.bplaced.net/currency.php')
  ).json();
  const currencies = data['waehrungen'];

  const selectCurrency = document.querySelector('#curr2');
  const resultText = document.querySelector('#result');

  currencies.forEach((currency) => {
    const currencyOption = document.createElement('option');
    currencyOption.value = currency;
    currencyOption.innerText = currency;
    selectCurrency.appendChild(currencyOption);
  });

  document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('waehrung', selectCurrency.value);
    formData.append('wieviel', document.getElementById('curr1').value);

    const result = await (
      await fetch('http://wifiweb.bplaced.net/currency_calc.php', {
        method: 'POST',
        body: formData,
      })
    ).text();

    resultText.value = result;
  });
})();
