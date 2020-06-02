const generatePwLink = document.getElementById('generate-password');
const userNameField = document.getElementById('userName');
const userEmailField = document.getElementById('email');
const userPasswordField = document.getElementById('userPassword');
const form = document.getElementById('add-user-form');

generatePwLink.addEventListener('click', async (e) => {
  e.preventDefault();
  const data = await fetch('http://localhost:5001/generatePassword');
  const password = await data.json();

  console.log(password);
  userPasswordField.value = password;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log(
    userNameField.value,
    userEmailField.value,
    userPasswordField.value,
  );

  fetch('http://localhost:5001/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName: userNameField.value,
      userEmail: userEmailField.value,
      userPassword: userPasswordField.value,
    }),
  });
});
