// Quick script to check events in database
// Run with: node check-events.js

require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    const events = await Event.find({}).select('eventName slug category');
    
    if (events.length === 0) {
      console.log('\n❌ No events found in database!');
      console.log('Create an event first before accessing the management panel.\n');
    } else {
      console.log(`\n✅ Found ${events.length} event(s):\n`);
      events.forEach(event => {
        console.log(`- ${event.eventName}`);
        console.log(`  Slug: ${event.slug}`);
        console.log(`  URL: /event/${event.slug}/manage`);
        console.log('');
      });
    }
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
