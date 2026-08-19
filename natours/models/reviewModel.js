const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty.'],
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be above 1.0.'],
      max: [5, 'Rating must be below 5.0.'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// Static model methods
reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  let ratingsAverage = 4.5;
  let ratingsQuantity = 0;

  if (stats.length > 0) {
    ratingsAverage = stats[0].avgRating;
    ratingsQuantity = stats[0].nRating;
  }

  await Tour.findByIdAndUpdate(tourId, {
    ratingsAverage,
    ratingsQuantity,
  });
}

// Document middleware
reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.tour);
});

// Query middleware
reviewSchema.pre(/^find/, function (next) {
  this
    .populate({
      path: 'user',
      select: 'name photo',
    });
  next();
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.reviewDoc = await this.findOne();

  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.reviewDoc.constructor.calcAverageRatings(this.reviewDoc.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
