const express = require('express');
// const fs = require('fs');
const fs = require('fs').promises;
const bp = require('body-parser');
const app = express();

app.listen(5006, () => {
  console.log('Server gestartet');
});

app.use(bp.urlencoded({ extended: false }));
app.use(express.static('www'));

app.get('/daten', (req, res) => {
  fs.readFile('./data/test.json')
    .then((content) => {
      res.status(200).end(content);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/daten', (req, res) => {
  var neuezahl = Number(req.body.zahl);
  fs.readFile('./data/test.json')
    .then((content) => {
      const zahlen = JSON.parse(content);
      zahlen.daten.push(neuezahl);
      fs.writeFile('./data/test.json', JSON.stringify(zahlen));
    })
    .then(() => {
      res.status(200).end('gespeichert');
    })
    .catch((err) => {
      console.log(err);
    });
});
