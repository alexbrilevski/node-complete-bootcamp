const fs = require('fs');
const express = require('express');

const app = express();

// Use middleware to add body property to the request object
app.use(express.json());

let tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

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

app.get('/api/v1/tours/:id', (req, res) => {
  const id = +req.params.id;
  const tour = tours.find(tour => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), error => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const id = +req.params.id;
  let tour = tours.find(tour => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  tour = { ...tour, ...req.body };
  tours = tours.map(el => el.id === id ? tour : el);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), error => {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on local host, port ${port}`);
});
