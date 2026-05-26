const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello from the server!');
});

server.listen(8000, 'localhost', () => {
  console.log('Listening of requests on localhost, port 8000');
});
