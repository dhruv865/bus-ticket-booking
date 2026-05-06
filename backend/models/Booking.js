const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  passengerName: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  seatNo: { type: Number, required: true },
  journeyDate: { type: String, required: true },
  bookedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);