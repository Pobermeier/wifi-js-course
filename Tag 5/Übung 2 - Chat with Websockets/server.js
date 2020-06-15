const express = require('express');
const socket = require('socket.io');
const moment = require('moment');
const app = express();

const PORT = process.env.PORT || 5005;

const server = app.listen(PORT, () => {
  console.log(`Server started and listening on port ${PORT}`);
});

app.use(express.static('www'));

const io = socket(server);

let users = [];

io.on('connection', (socket) => {
  console.log('New connection: ' + socket.id);
  let nickname;

  socket.emit('connected');

  socket.on('newuser', (username) => {
    console.log('User: ' + username);
    nickname = username;
    users.push(nickname);
    console.log('Active users: ' + users);

    socket.broadcast.emit(
      'user',
      `User <strong>${username}</strong> joined server`,
    );
  });

  socket.on('getUsers', () => {
    socket.emit(
      'getUsers',
      `<strong>Active Users:</strong> ${users.join(', ')}`,
    );
  });

  socket.on('chatmessage', (message) => {
    io.emit(
      'chatmessage',
      `<i>[${moment().format(
        'h:mm:ss a',
      )}]</i> <strong>${nickname}:</strong> ${message}`,
    );
  });

  socket.on('disconnect', (reason) => {
    console.log('Connection terminated: ' + socket.id);
    users = users.filter((user) => user !== nickname);
    console.log('Active users: ' + users);
    io.emit(
      'user',
      `<i>[${moment().format(
        'h:mm:ss a',
      )}]</i> <strong>${nickname}</strong> left the server`,
    );
  });
});
