const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const {
  checkEmail,
  checkUsername,
  generatePassword,
  generateUUID,
} = require('./helpers');

// Init express
const app = express();
const PORT = 5003;

// Express middleware
app.use(express.static(path.join(__dirname, 'wwwroot')));
app.use(bodyParser.json());

// Init Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 587,
  secure: false,
  auth: {
    user: '4c951ff8b66d2d',
    pass: '6bf9452e753f7f',
  },
});

// Load data from json-file & make data transformations on in-memory data while server is running
let users = JSON.parse(fs.readFileSync('data.json'));

// @route GET /generatePassword
// @desc Generate a secure password on the server and return it to the client
app.get('/generatePassword', (req, res) => {
  res.status(200);
  res.json(generatePassword());
});

// @route GET /users
// @desc Get all user data
app.get('/users', (req, res) => {
  console.log('GET /users');
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(500).json({
      msg: 'Server Error! Could not fetch user data! Please try again later...',
    });
  }
});

// @route POST /birthday
// @desc Add a new entry & Save name + birthday
app.post('/users', async (req, res) => {
  console.log('POST /users');
  const newUserData = req.body;
  console.log(newUserData);

  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).json({ msg: 'Invalid data!' });
    return;
  }

  if (checkUsername(req.body.username, users)) {
    console.error('A user with that username already exists!');
    res.status(400).json({ msg: 'A user with that username already exists!' });
    return;
  }

  if (checkEmail(req.body.email, users)) {
    console.error('A user with that e-mail address already exists!');
    res
      .status(400)
      .json({ msg: 'A user with that e-mail address already exists!' });
    return;
  }

  newUserData.id = generateUUID();
  users && users.push(newUserData);

  res.status(200).json(users);

  let info = await transporter.sendMail({
    from: '"User Manager" <admin@usermanager.com>',
    to: `${req.body.email}`,
    subject: 'Welcome',
    text: `Hello ${req.body.username}`,
    html: `Hello ${req.body.username}`,
  });

  console.log('Message sent: %s', info.messageId);
});

// @route DELETE /birthday/:id
// @desc Delete an entry
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  console.log(`DELETE /users/${id}`);

  if (!id) {
    res.status(400).json({ msg: 'Missing param: ID' });
    return;
  }

  users = users.filter((user) => user.id !== id);

  res.status(200).json(users);
});

// @route PUT /birthday
// @desc Edit & update an entry
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const { username, email, password } = req.body;

  console.log(`PUT /users/${id}`);
  console.log(req.body);

  if (!id || !username || !email || !password) {
    res.status(400).json({ msg: 'Invalid Data!' });
    return;
  }

  users = users.map((user) => {
    if (user.id === id) {
      return {
        id,
        username,
        email,
        password,
      };
    }
    return user;
  });
  res.status(200).json(users);
});

app.listen(PORT, () => {
  console.log(`Server running and listening on PORT ${PORT}`);
});

// On process-exit (STRC-C * 2) write user data to JSON-file
process.on('SIGINT', () => {
  fs.writeFileSync('data.json', JSON.stringify(users));
  process.exit();
});
