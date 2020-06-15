const messages = document.querySelector('#messages');
const submitButton = document.querySelector('#submit-btn');
const logoutButton = document.querySelector('#logout-btn');
const input = document.querySelector('#m');

let connected = false;
let socket;

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  if (!connected) {
    socket = io(`http://${window.location.hostname}:5005`);

    socket.on('connected', () => {
      input.value = '';
      input.placeholder = 'Enter your message here...';
      submitButton.innerText = 'Send';
      input.focus();
    });

    socket.emit('newuser', input.value);

    socket.on('user', (message) => {
      messages.innerHTML += `<li>${message}</li>`;
    });
    socket.on('chatmessage', (message) => {
      messages.innerHTML += `<li>${message}</li>`;
    });
    socket.on('getUsers', (message) => {
      messages.innerHTML += `<li>${message}</li>`;
    });

    logoutButton.style.display = 'inline-block';
    connected = true;
    return;
  }

  if (input.value.trim() !== '') {
    if (input.value.trim() === '/users') {
      socket.emit('getUsers');
    } else {
      socket.emit('chatmessage', input.value);
    }

    input.value = '';
    input.focus();
  }
});

logoutButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (connected) {
    socket.disconnect();
    document.querySelector('#m').value = '';
    document.querySelector('#m').placeholder = 'Enter your username...';
    submitButton.innerText = 'Login';
    document.querySelector('#logout-btn').style.display = 'none';
    connected = false;
    socket = null;
  }
});
