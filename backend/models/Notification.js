const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['broadcast', 'alert', 'update', 'allocation'], default: 'broadcast' },
  recipients: [{ type: String }],
  status: { type: String, enum: ['draft', 'sent'], default: 'sent' },
  reach: { type: Number, default: 0 },
  openRate: { type: Number, default: 0 },
  engagements: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
