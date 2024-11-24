const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.get('/my-bookings', bookingController.getMyBookings);

router
  .route('/')
  .get(
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.getAllBookings,
  )
  .post(
    bookingController.setTourUserIds,
    bookingController.checkBookingAvailability,
    bookingController.createBooking,
  );

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.updateBooking
  )
  .delete(
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.deleteBooking,
  );

module.exports = router;
