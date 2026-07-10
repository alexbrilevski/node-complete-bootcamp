const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  }
  catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    // Tour.findOne({ _id: req.params.id });
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }
  catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // newTour.save();
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  }
  catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateTour = (req, res) => {
  // const id = +req.params.id;
  // let tour = tours.find(tour => tour.id === id);

  // tour = { ...tour, ...req.body };
  // tours = tours.map(el => el.id === id ? tour : el);

  // fs.writeFile(toursDataFilePath, JSON.stringify(tours), error => {
  //   if (error) {
  //     return res.status(404).json({
  //       status: 'fail',
  //       message: 'Failed to write data to file.',
  //     });
  //   }

  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       tour,
  //     },
  //   });
  // });
};

exports.deleteTour = (req, res) => {
  const id = +req.params.id;

  // tours = tours.filter(el => el.id !== id);

  // fs.writeFile(toursDataFilePath, JSON.stringify(tours), error => {
  //   if (error) {
  //     return res.status(404).json({
  //       status: 'fail',
  //       message: 'Failed to write data to file.',
  //     });
  //   }

  //   res.status(204).json({
  //     status: 'success',
  //     data: null,
  //   });
  // });
};
