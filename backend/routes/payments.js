const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// Get all payments for organizer's events
router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find({ organizerId: req.userId });
    const eventIds = events.map(e => e._id);
    const payments = await Payment.find({ eventId: { $in: eventIds } })
      .populate('eventId', 'eventName slug')
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get payments for specific event
router.get('/event/:eventId', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event || event.organizerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const payments = await Payment.find({ eventId: req.params.eventId }).sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get payment statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const events = await Event.find({ organizerId: req.userId });
    const eventIds = events.map(e => e._id);
    
    const payments = await Payment.find({ eventId: { $in: eventIds } });
    
    const totalRevenue = payments
      .filter(p => p.status === 'Completed')
      .reduce((sum, p) => sum + p.amount, 0);
    
    const pendingPayouts = payments
      .filter(p => p.status === 'Pending')
      .reduce((sum, p) => sum + p.amount, 0);
    
    const totalRefunds = payments
      .filter(p => p.status === 'Refunded')
      .reduce((sum, p) => sum + p.refundAmount, 0);
    
    res.json({
      totalRevenue,
      pendingPayouts,
      totalRefunds,
      totalTransactions: payments.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create payment
router.post('/', auth, async (req, res) => {
  try {
    const payment = new Payment({
      ...req.body,
      transactionId: `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`
    });
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update payment status (for refunds)
router.patch('/:id/refund', auth, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('eventId');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    if (payment.eventId.organizerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    payment.status = 'Refunded';
    payment.refundAmount = payment.amount;
    payment.refundedAt = new Date();
    await payment.save();
    
    res.json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
