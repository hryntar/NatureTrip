const Booking = require('../models/bookingModel');
const Tour = require('../models/tourModel');
const factory = require('./handlerfactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.checkBookingAvailability = catchAsync(async (req, res, next) => {
  const { tour: tourId, startDate, participants } = req.body;

  // Check if there are enough spots available for the selected date
  const existingBookings = await Booking.find({
    tour: tourId,
    startDate: startDate,
  });

  const totalParticipants = existingBookings.reduce(
    (sum, booking) => sum + booking.participants,
    0,
  );

  const tour = await Tour.findById(tourId);
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  if (totalParticipants + participants > tour.maxGroupSize) {
    return next(
      new AppError(
        'Not enough spots available for this date. Please choose another date or reduce number of participants.',
        400,
      ),
    );
  }

  next();
});

exports.getAllBookings = factory.getAll(Booking);
exports.getBooking = factory.getOne(Booking);
exports.createBooking = factory.createOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);

exports.updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  const tour = await Tour.findById(booking.tour);
  if (!tour) {
    return next(new AppError('No tour found for this booking', 404));
  }

  if (req.body.participants && req.body.participants > tour.maxGroupSize) {
    return next(
      new AppError(
        `This tour can only accommodate ${tour.maxGroupSize} participants`,
        400,
      ),
    );
  }

  const updatedBooking = await Booking.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: false,
    },
  );

  res.status(200).json({
    status: 'success',
    data: {
      booking: updatedBooking,
    },
  });
});

exports.getMyBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id });

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings,
    },
  });
});
