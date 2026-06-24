const fs = require('fs');

const toursDataFilePath = `${__dirname}/../dev-data/data/tours-simple.json`;
let tours = JSON.parse(fs.readFileSync(toursDataFilePath));

exports.checkId = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (val >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find(tour => tour.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(toursDataFilePath, JSON.stringify(tours), error => {
    if (error) {
      return res.status(404).json({
        status: 'fail',
        message: 'Failed to write data to file.',
      });
    }

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
};

exports.updateTour = (req, res) => {
  const id = +req.params.id;
  let tour = tours.find(tour => tour.id === id);

  tour = { ...tour, ...req.body };
  tours = tours.map(el => el.id === id ? tour : el);

  fs.writeFile(toursDataFilePath, JSON.stringify(tours), error => {
    if (error) {
      return res.status(404).json({
        status: 'fail',
        message: 'Failed to write data to file.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  });
};

exports.deleteTour = (req, res) => {
  const id = +req.params.id;

  tours = tours.filter(el => el.id !== id);

  fs.writeFile(toursDataFilePath, JSON.stringify(tours), error => {
    if (error) {
      return res.status(404).json({
        status: 'fail',
        message: 'Failed to write data to file.',
      });
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
};
