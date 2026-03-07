const express = require('express');
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const RoomAssignment = require('../models/RoomAssignment');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all events for organizer
router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find({ organizerId: req.userId }).sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get event by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get event by slug (public)
router.get('/slug/:slug', async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug, status: 'published' });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create event
router.post('/', auth, async (req, res) => {
  try {
    const event = new Event({ ...req.body, organizerId: req.userId });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update event
router.put('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, organizerId: req.userId },
      req.body,
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update event by slug
router.put('/slug/:slug', async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete event
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id, organizerId: req.userId });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== REGISTRATIONS =====

// Get registrations for event
router.get('/:slug/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find({ eventSlug: req.params.slug }).sort({ registeredAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create registration
router.post('/:slug/registrations', async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const registration = new Registration({ ...req.body, eventId: event._id, eventSlug: req.params.slug });
    await registration.save();
    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete registration
router.delete('/:slug/registrations/:id', async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: 'Registration deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== ROOM ASSIGNMENTS =====

// Get room assignments
router.get('/:slug/room-assignments', async (req, res) => {
  try {
    const assignments = await RoomAssignment.find({ eventSlug: req.params.slug });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create room assignment
router.post('/:slug/room-assignments', async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const assignment = new RoomAssignment({ ...req.body, eventId: event._id, eventSlug: req.params.slug });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete room assignment
router.delete('/:slug/room-assignments/:guestId', async (req, res) => {
  try {
    await RoomAssignment.findOneAndDelete({ eventSlug: req.params.slug, guestId: req.params.guestId });
    res.json({ message: 'Assignment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== NOTIFICATIONS =====

// Get notifications
router.get('/:slug/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({ eventSlug: req.params.slug }).sort({ sentAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create notification
router.post('/:slug/notifications', async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const notification = new Notification({ ...req.body, eventId: event._id, eventSlug: req.params.slug });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
