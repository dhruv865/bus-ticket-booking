const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNo: Number,
  type: { type: String, enum: ['seater', 'single_sleeper', 'double_sleeper'], default: 'seater' },
  fare: Number,
  deck: { type: String, enum: ['lower', 'upper'], default: 'lower' }
});

const busSchema = new mongoose.Schema({
  busName: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  fare: { type: Number, required: true },
  busType: { 
    type: String, 
    enum: ['seater', 'sleeper', 'mixed'], 
    default: 'seater' 
  },
  seaterFare: { type: Number, default: 0 },
  singleSleeperFare: { type: Number, default: 0 },
  doubleSleeperFare: { type: Number, default: 0 },
  seaterCount: { type: Number, default: 0 },
  singleSleeperCount: { type: Number, default: 0 },
  doubleSleeperCount: { type: Number, default: 0 },
  seats: [seatSchema],
  pickupPoints: [{ time: String, location: String }],
  dropPoints: [{ time: String, location: String }]
});

module.exports = mongoose.model('Bus', busSchema);