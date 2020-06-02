const http = require('http');
const fs = require('fs');
const lottoGen = require('./lotto.js');

http
  .createServer(function (request, response) {
    switch (request.url) {
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
