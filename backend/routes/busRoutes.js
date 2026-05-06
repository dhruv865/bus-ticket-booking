const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// Get all buses by source & destination
router.get('/search', async (req, res) => {
  const { source, destination } = req.query;
  try {
    const buses = await Bus.find({ source, destination });
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all buses (admin)
router.get('/', async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new bus (admin)
router.post('/add', async (req, res) => {
  const bus = new Bus(req.body);
  try {
    const newBus = await bus.save();
    res.status(201).json(newBus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete bus (admin)
router.delete('/:id', async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bus deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;