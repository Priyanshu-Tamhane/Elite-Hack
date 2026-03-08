const express = require('express');
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const RoomAssignment = require('../models/RoomAssignment');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');
const { sendRegistrationEmail } = require('../utils/emailService');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find({ organizerId: req.userId }).sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
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

router.get('/slug/:slug', async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const event = new Event({ ...req.body, organizerId: req.userId });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:slug/register', async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.participants.push(req.body);
    event.registeredCount = event.participants.length;
    await event.save();

    // Send email
    if (req.body.email && req.body.name) {
      console.log('Attempting to send email to:', req.body.email);
      const emailResult = await sendRegistrationEmail(
        req.body.email,
        req.body.name,
        event.eventName,
        {
          startDate: event.startDate,
          venue: event.venue,
          startTime: event.startTime,
          slug: event.slug
        }
      );
      console.log('Email result:', emailResult);
    } else {
      console.log('Missing email or name:', { email: req.body.email, name: req.body.name });
    }

    res.status(201).json({ message: 'Registration successful', event });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message });
  }
});

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

router.get('/:slug/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find({ eventSlug: req.params.slug }).sort({ registeredAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:slug/registrations', async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Auto-confirm for conference & hackathon events
    const autoConfirmCategories = ['conference', 'hackathon', 'workshop'];
    const status = autoConfirmCategories.includes(event.category)
      ? 'confirmed'
      : (req.body.status || 'pending');

    const registration = new Registration({
      ...req.body,
      status,
      eventId: event._id,
      eventSlug: req.params.slug,
    });
    await registration.save();
    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update registration status (confirm / decline / pending)
router.patch('/:slug/registrations/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'declined'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Use: pending, confirmed, or declined' });
    }
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:slug/registrations/:id', async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: 'Registration deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== ROOM ASSIGNMENTS =====

router.get('/:slug/room-assignments', async (req, res) => {
  try {
    const assignments = await RoomAssignment.find({ eventSlug: req.params.slug });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

router.delete('/:slug/room-assignments/:guestId', async (req, res) => {
  try {
    await RoomAssignment.findOneAndDelete({ eventSlug: req.params.slug, guestId: req.params.guestId });
    res.json({ message: 'Assignment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== NOTIFICATIONS =====

router.get('/:slug/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({ eventSlug: req.params.slug }).sort({ sentAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
