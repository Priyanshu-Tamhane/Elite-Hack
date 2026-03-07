const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  startTime: { type: String },
  venue: { type: String, required: true },
  category: { type: String, required: true },
  bannerImage: { type: String },
  slug: { type: String, required: true, unique: true },
  managementPassword: { type: String, required: true },
  status: { type: String, enum: ['draft', 'published', 'cancelled'], default: 'published' },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  maxParticipants: { type: Number },
  registeredCount: { type: Number, default: 0 },
  participants: [{
    name: String,
    email: String,
    phone: String,
    registeredAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
