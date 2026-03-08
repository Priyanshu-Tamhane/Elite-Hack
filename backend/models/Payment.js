const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  participantId: { type: mongoose.Schema.Types.ObjectId },
  participantName: { type: String, required: true },
  participantEmail: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  category: { type: String, required: true }, // 'Ticket', 'Accommodation', 'Workshop', etc.
  paymentMethod: { type: String }, // 'VISA', 'MASTERCARD', 'PAYPAL', 'BANK TRANSFER'
  status: { type: String, enum: ['Completed', 'Pending', 'Refunded', 'Failed'], default: 'Pending' },
  transactionId: { type: String, unique: true, required: true },
  refundAmount: { type: Number, default: 0 },
  refundedAt: { type: Date },
  metadata: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
