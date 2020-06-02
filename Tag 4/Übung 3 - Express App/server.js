const express = require('express');

const app = express();

app.use(express.static('static'));

app.listen(5001, () => {
  console.log('Server started on port 5001');
});
