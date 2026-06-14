const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.status(200).json({ message: 'Test message', app: 'Natours' });
});

app.post('/', (request, response) => {
  response.status(200).send('Post requests to this endpoint are allowed');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on local host, port ${port}`);
});
