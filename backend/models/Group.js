const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: String,
  message: String,
  time: { type: Date, default: Date.now }
});

const groupSchema = new mongoose.Schema({
  groupCode: { type: String, required: true, unique: true },
  groupName: { type: String, required: true },
  createdBy: { type: String, required: true },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
  journeyDate: String,
  members: [{
    name: String,
    email: String,
    joinedAt: { type: Date, default: Date.now },
    seatNo: Number
  }],
  messages: [messageSchema],
  maxMembers: { type: Number, default: 10 },
  status: { type: String, enum: ['active', 'completed'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);