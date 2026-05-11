const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const { v4: uuidv4 } = require('uuid');

// Create a new group
router.post('/create', async (req, res) => {
  try {
    const { groupName, createdBy, busId, journeyDate, maxMembers } = req.body;
    const groupCode = uuidv4().slice(0, 8).toUpperCase();
    const group = new Group({
      groupCode,
      groupName,
      createdBy,
      busId,
      journeyDate,
      maxMembers: maxMembers || 10,
      members: [{ name: createdBy, email: req.body.email }]
    });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Join a group
router.post('/join', async (req, res) => {
  try {
    const { groupCode, name, email } = req.body;
    const group = await Group.findOne({ groupCode });
    if (!group) return res.status(404).json({ message: 'Group not found!' });
    if (group.members.length >= group.maxMembers)
      return res.status(400).json({ message: 'Group is full!' });
    const alreadyJoined = group.members.find(m => m.email === email);
    if (alreadyJoined) return res.json(group);
    group.members.push({ name, email });
    await group.save();
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get group by code
router.get('/:groupCode', async (req, res) => {
  try {
    const group = await Group.findOne({ groupCode: req.params.groupCode }).populate('busId');
    if (!group) return res.status(404).json({ message: 'Group not found!' });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Send message
router.post('/:groupCode/message', async (req, res) => {
  try {
    const { sender, message } = req.body;
    const group = await Group.findOne({ groupCode: req.params.groupCode });
    if (!group) return res.status(404).json({ message: 'Group not found!' });
    group.messages.push({ sender, message });
    await group.save();
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all groups for a user
router.get('/user/:email', async (req, res) => {
  try {
    const groups = await Group.find({
      'members.email': req.params.email
    }).populate('busId');
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;