const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOne = (Model, populateOptions) => catchAsync(async (req, res, next) => {
  // Model.findOne({ _id: req.params.id });
  let query = Model.findById(req.params.id);
  if (populateOptions) query = query.populate(populateOptions)
  const doc = await query;

  if (!doc) {
    return next(new AppError('No document was found with that Id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.createOne = Model => catchAsync(async (req, res, next) => {
  // const newDoc = new Model({});
  // newDoc.save();
  const newDoc = await Model.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newDoc,
    },
  });
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('No document was found with that Id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document was found with that Id', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
