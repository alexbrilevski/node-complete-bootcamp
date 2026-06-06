const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const emitter = new Sales();

emitter.on('newSale', () => {
  console.log('New sale');
});

emitter.on('newSale', () => {
  console.log('Customer name: Alex');
});

emitter.on('newSale', stock => {
  console.log(`Items left in stock: ${stock}`);
});

emitter.emit('newSale', 10);

const server = http.createServer();

server.on('request', (request, response) => {
  console.log('Request received');
  console.log(request.url);
  response.end('Request received');
});

server.on('request', (request, response) => {
  console.log('Request 2 received');
});

server.on('close', () => {
  console.log('Server closed');
});

server.listen(8000, 'localhost', () => {
  console.log('Listening for requests...');
});
