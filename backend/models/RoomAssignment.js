const mongoose = require('mongoose');

const roomAssignmentSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  eventSlug: { type: String, required: true },
  guestId: { type: String, required: true },
  guestName: { type: String, required: true },
  roomType: { type: String, required: true },
  roomNumber: { type: String, required: true },
  assignedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('RoomAssignment', roomAssignmentSchema);
