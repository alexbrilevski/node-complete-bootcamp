const http = require('http');

const server = http.createServer((req, res) => {
  const route = req.url;

  if (route === '/' || route === '/overview') {
    res.end('This is Overview page');
  } else if (route === '/product') {
    res.end('This is Product page');
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
