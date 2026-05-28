const fs = require('fs');
const http = require('http');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const route = req.url;

  if (route === '/' || route === '/overview') {
    res.end('This is Overview page');
  } else if (route === '/product') {
    res.end('This is Product page');
  } else if (route === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(8000, 'localhost', () => {
  console.log('Listening of requests on localhost, port 8000');
});
