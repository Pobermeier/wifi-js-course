const express = require('express');
const bodyParser = require('body-parser');

const generatePassword = require('./pwGenerator');
const users = require('./users');

const app = express();

app.use(bodyParser.json());
app.use(express.static('static'));

app.get('/generatePassword', (req, res) => {
  res.status(200);
  res.json(generatePassword());
});

app.get('/getUsers', (req, res) => {
  res.status(200);
  res.json(users);
});

app.post('/addUser', (req, res) => {
  console.log(req.body);
  users.push({
    id: users.length + 1,
    name: req.body.userName,
    email: req.body.userEmail,
    password: req.body.userPassword,
  });
  console.log(users);
  res.status(200).json({ status: '200 Success' });
});

app.listen(5001, () => {
  console.log('Server started on port 5001');
});
