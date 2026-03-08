const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// Get all notifications for organizer's events
router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find({ organizerId: req.userId });
    const eventIds = events.map(e => e._id);
    const notifications = await Notification.find({ eventId: { $in: eventIds } })
      .populate('eventId', 'eventName slug')
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get notification by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id).populate('eventId', 'eventName slug');
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create notification
router.post('/', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.body.eventId);
    if (!event || event.organizerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const notification = new Notification({
      ...req.body,
      organizerId: req.userId,
      reach: event.participants?.length || 0
    });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update notification
router.put('/:id', auth, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification || notification.organizerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    Object.assign(notification, req.body);
    await notification.save();
    res.json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete notification
router.delete('/:id', auth, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification || notification.organizerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    await notification.deleteOne();
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
