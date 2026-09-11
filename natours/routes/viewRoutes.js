const express = require('express');
const authController = require('./../controllers/authController');
const viewsController = require('./../controllers/viewsController');
const bookingController = require('./../controllers/bookingController');

const router = express.Router();

router.get('/me', authController.protectRoute, viewsController.getAccount);
router.get(
  '/my-bookings',
  // bookingController.createBookingCheckout, 
  authController.protectRoute,
  viewsController.getMyBookings
);
router.post('/submit-user-data', authController.protectRoute, viewsController.updateUserData);

router.use(authController.isLogged);

router.get('/', viewsController.getOverview);

router.get('/tour/:slug', viewsController.getTour);

router.get('/login', viewsController.getLoginPage);

module.exports = router;
