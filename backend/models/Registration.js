const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  eventSlug: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  guestsCount: { type: Number, default: 1 },
  status: { type: String, enum: ['pending', 'confirmed', 'declined'], default: 'pending' },
  mealPreference: { type: String },
  accommodationRequested: { type: Boolean, default: false },
  registeredAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);
