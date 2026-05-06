const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create new booking
router.post('/add', async (req, res) => {
  const booking = new Booking(req.body);
  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all bookings (admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('busId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get booked seats for a bus on a date
router.get('/seats/:busId/:date', async (req, res) => {
  try {
    const bookings = await Booking.find({
      busId: req.params.busId,
      journeyDate: req.params.date
    });
    const bookedSeats = bookings.map(b => b.seatNo);
    res.json(bookedSeats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete booking
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;