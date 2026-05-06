const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busName: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  fare: { type: Number, required: true }
});

module.exports = mongoose.model('Bus', busSchema);