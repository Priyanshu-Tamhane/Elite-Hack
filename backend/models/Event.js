const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  title: { type: String },
  description: { type: String, required: true },
  category: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  startTime: { type: String },
  venue: { type: String, required: true },
  bannerUrl: { type: String },
  slug: { type: String, required: true, unique: true },
  status: { type: String, enum: ['draft', 'published', 'cancelled'], default: 'draft' },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Inventory
  inventory: {
    maxParticipants: { type: Number },
    teamSize: { type: Number },
    twinRooms: { type: Number },
    suites: { type: Number },
    bunkBeds: { type: Number }
  },
  
  // RSVP Settings
  rsvp_settings: {
    enabled: { type: Boolean, default: true },
    plus_one: { type: Boolean, default: true },
    max_guests: { type: Number, default: 5 },
    meal_preference: { type: Boolean, default: true }
  },
  
  // Media
  media: {
    hero_image: { type: String },
    gallery: [{ type: String }]
  },
  
  // Schedule
  schedule: [{
    id: String,
    name: String,
    title: String,
    date: String,
    time: String,
    venue: String
  }],
  
  // Accommodation
  accommodation: {
    hotel_name: { type: String },
    twin_rooms: { type: Number },
    suites: { type: Number },
    bunk_beds: { type: Number }
  },
  
  // Contact
  contact: {
    name: { type: String },
    phone: { type: String },
    email: { type: String }
  },
  
  // Admin credentials
  adminPassword: { type: String },
  
  maxParticipants: { type: Number },
  registeredCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
