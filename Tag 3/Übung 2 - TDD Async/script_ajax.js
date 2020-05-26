const addNumbersOnServer = async (num1, num2, callback) => {
  const formData = new FormData();
  formData.append('a', num1);
  formData.append('b', num2);

  const result = await (
    await fetch('http://wifiweb.bplaced.net/summe.php', {
      method: 'POST',
      body: formData,
    })
  ).text();

  callback && callback();

  console.log(JSON.parse(result)['summe']);
  return JSON.parse(result)['summe'];
};

addNumbersOnServer(1, 2);
