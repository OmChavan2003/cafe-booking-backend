const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// POST request to /api/bookings will trigger createBooking
router.post('/', bookingController.createBooking);

// GET request to /api/bookings will trigger getAllBookings
router.get('/', bookingController.getAllBookings);

// PUT request to /api/bookings/:id will trigger updateBooking
router.put('/:id', bookingController.updateBooking);

// DELETE request to /api/bookings/:id will trigger deleteBooking
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;