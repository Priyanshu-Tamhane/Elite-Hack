const express = require('express');
const Event = require('../models/Event');
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

// ===== REGISTRATIONS (stored in Event.participants) =====

router.get('/:slug/registrations', async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event.participants || []);
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

    event.participants.push(req.body);
    event.registeredCount = event.participants.length;
    await event.save();
    
    // Send confirmation email
    if (req.body.email && req.body.name) {
      console.log('Sending confirmation email to:', req.body.email);
      await sendRegistrationEmail(
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
    }
    
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:slug/registrations/:id', async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    event.participants = event.participants.filter(p => p._id.toString() !== req.params.id);
    event.registeredCount = event.participants.length;
    await event.save();
    
    res.json({ message: 'Registration deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== NOTIFICATIONS =====

router.get('/:slug/notifications', async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const notifications = await Notification.find({ eventId: event._id }).sort({ createdAt: -1 });
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
    const notification = new Notification({ ...req.body, eventId: event._id });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
