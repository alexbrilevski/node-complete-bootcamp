const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Render template using tours data
  res.status(200).render('overview', {
    title: 'Exciting tours for adventurous people',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get data for the requested tour (including guides and reviews)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;

  // 2) Render template using tour data
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    mapboxAccessToken,
    tour,
  });
});
