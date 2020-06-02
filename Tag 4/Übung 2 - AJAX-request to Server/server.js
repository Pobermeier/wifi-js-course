const http = require('http');
const fs = require('fs');
const lottoGen = require('./lotto.js');

http
  .createServer(function (request, response) {
    switch (request.url) {
      case '/':
      case '/index.html':
      case '/index.php':
        response.writeHead(200, { 'Content-Type': 'text/html, charset=utf-8' });

        fs.readFile('static/index.html', function (err, data) {
          if (!err) {
            response.end(data);
          } else {
            response.writeHead(404);
            response.end('Error404');
          }
        });

        break;

      case '/jquery-3.5.1.min.js':
      case '/lotto.js':
        fs.readFile('static/' + request.url, function (err, data) {
          if (!err) {
            response.end(data);
          }
        });
        break;

      case '/getnumbers':
        response.writeHead(200, {
          'Content-Type': 'application/json, charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        });
        response.end(JSON.stringify(lottoGen(6, 45)));
        break;

      default:
        response.writeHead(404);
        response.end('Error404');
    }
  })
  .listen(5001);

console.log('Server auf Port 5001 gestartet');
