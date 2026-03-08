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
  bannerImage: { type: String },
  slug: { type: String, required: true, unique: true },
  managementPassword: { type: String, required: true },
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

  // Media
  media: {
    hero_image: { type: String },
    gallery: [{ type: String }]
  },

  // Schedule (used by hackathon/wedding)
  schedule: [{
    day: String,
    time: String,
    type: String,
    title: String,
    description: String
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

  // Hackathon specific
  prizes: {
    first: { amount: String, perks: String },
    second: { amount: String, perks: String },
    third: { amount: String, perks: String },
    special: [{ title: String, amount: String }]
  },
  sponsors: [{
    name: String,
    tier: String,
    website: String,
    description: String
  }],
  tracks: [{
    title: String,
    description: String
  }],
  organizers: [{
    name: String,
    role: String,
    company: String,
    email: String,
    twitter: String,
    linkedin: String
  }],

  // Admin credentials
  adminPassword: { type: String },

  maxParticipants: { type: Number },
  registeredCount: { type: Number, default: 0 },
  participants: [{
    name: String,
    email: String,
    phone: String,
    teamName: String,
    teamSize: String,
    experience: String,
    track: String,
    bio: String,
    registeredAt: { type: Date, default: Date.now }
  }],

  // ─── CONFERENCE-SPECIFIC FIELDS ────────────────────────────────────

  // Conference core info
  conferenceInfo: {
    tagline: { type: String },
    eventMode: { type: String, enum: ['In-Person', 'Virtual', 'Hybrid'] },
    logo: { type: String },
  },

  // Registration settings (conference)
  registrationSettings: {
    registrationType: { type: String, enum: ['free', 'paid'], default: 'free' },
    maxAttendees: { type: Number },
    deadline: { type: String },
    tickets: [{
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      type: { type: String },   // "General", "Researcher", etc.
      price: { type: Number },
      currency: { type: String, default: 'USD' },
      paperSubmission: { type: Boolean, default: false },
      benefits: [{ type: String }],
      color: { type: String },   // 'indigo' | 'cyan' | 'purple' | 'green'
    }]
  },

  // Multi-day agenda (conference)
  agenda: [{
    day: { type: Number },
    label: { type: String },  // e.g. "Day 1 – Opening"
    date: { type: String },
    sessions: [{
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      title: { type: String },
      speaker: { type: String },
      startTime: { type: String },
      endTime: { type: String },
      room: { type: String },
    }]
  }],

  // Downloadable resources (conference)
  resources: [{
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    label: { type: String },
    url: { type: String },
    fileType: { type: String },   // 'pdf', 'docx', etc.
  }],

  // ─── CORPORATE-SPECIFIC FIELDS ─────────────────────────────────────

  corporateDetails: {
    companyMission: { type: String },
    eventObjectives: { type: [String], default: [] },
    targetAudience: { type: String },
    dressCode: { type: String },
    parkingInfo: { type: String },
    contactPerson: { type: String },
    contactEmail: { type: String },
    departmentAllocations: [{
      department: String,
      allocatedSeats: Number,
      registeredCount: { type: Number, default: 0 }
    }],
    budget: {
      totalBudget: Number,
      cateringBudget: Number,
      venueBudget: Number,
      marketingBudget: Number
    },
    vendors: [{
      name: String,
      service: String,
      contact: String,
      cost: Number
    }]
  },

  // Branding
  branding: {
    primaryColor: { type: String, default: '#2563eb' },
    secondaryColor: { type: String, default: '#64748b' },
    logoUrl: { type: String },
    bannerUrl: { type: String }
  },

  // ─── FESTIVAL-SPECIFIC FIELDS ─────────────────────────────────────
  festival: {
    sub_events: [{
      name: String,
      category: String,
      description: String,
      date: String,
      time: String
    }],
    tickets: [{
      name: String,
      price: Number,
      description: String
    }],
    artists: [{
      name: String,
      type: String,
      date: String,
      time: String,
      stage: String
    }],
    sponsors: [{
      name: String,
      category: String
    }],
    social_links: {
      instagram: String,
      youtube: String,
      facebook: String,
      twitter: String
    }
  }

}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
