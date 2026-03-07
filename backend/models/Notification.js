const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  eventSlug: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
