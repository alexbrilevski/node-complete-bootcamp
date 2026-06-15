const fs = require('fs');
const express = require('express');

const app = express();

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/', (request, response) => {
  response.status(200).json({ message: 'Test message', app: 'Natours' });
});

app.post('/', (request, response) => {
  response.status(200).send('Post requests to this endpoint are allowed');
});

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on local host, port ${port}`);
});
