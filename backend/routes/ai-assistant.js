const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message, eventData } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if OpenAI is configured and has quota
    const useOpenAI = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here';

    let response;

    if (useOpenAI) {
      try {
        const OpenAI = require('openai');
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const eventContext = buildEventContext(eventData);

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an AI assistant helping event organizers manage their event dashboard on EventSphere platform. 

You have access to the following event data:
${eventContext}

Provide helpful, concise responses about the event. When asked about statistics, provide specific numbers. When asked to perform actions, acknowledge the request and explain what would happen (note: actual actions are not yet implemented).

Be professional, friendly, and focused on helping the organizer manage their event effectively.`
            },
            {
              role: "user",
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        });

        response = completion.choices[0].message.content;
      } catch (openaiError) {
        console.log('OpenAI Error, falling back to mock:', openaiError.message);
        response = generateMockResponse(message, eventData);
      }
    } else {
      // Use mock AI
      response = generateMockResponse(message, eventData);
    }

    res.json({ response });

  } catch (error) {
    console.error('AI Assistant Error:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      response: 'I apologize, but I encountered an error processing your request. Please try again.'
    });
  }
});

function generateMockResponse(message, eventData) {
  const msg = message.toLowerCase();

  // Registration/Participant queries
  if (msg.includes('registration') || msg.includes('participant') || msg.includes('how many') || msg.includes('count') || msg.includes('total')) {
    const count = eventData?.participants?.length || eventData?.registeredCount || 0;
    if (count === 0) {
      return `You currently have no registrations for "${eventData?.eventName || 'your event'}" yet.`;
    }
    return `You currently have ${count} participant${count !== 1 ? 's' : ''} registered for "${eventData?.eventName || 'your event'}".`;
  }

  // Ticket queries
  if (msg.includes('ticket')) {
    const tickets = eventData?.registrationSettings?.tickets || eventData?.festival?.tickets || [];
    if (tickets.length > 0) {
      let response = 'Here are your ticket types:\n\n';
      tickets.forEach(t => {
        response += `• ${t.type || t.name}: $${t.price}\n`;
      });
      return response;
    }
    return 'No ticket information available for this event.';
  }

  // Schedule queries
  if (msg.includes('schedule') || msg.includes('session')) {
    const scheduleCount = eventData?.schedule?.length || 0;
    const agendaDays = eventData?.agenda?.length || 0;
    if (scheduleCount > 0) {
      return `Your event has ${scheduleCount} session${scheduleCount !== 1 ? 's' : ''} scheduled.`;
    }
    if (agendaDays > 0) {
      return `Your event agenda spans ${agendaDays} day${agendaDays !== 1 ? 's' : ''}.`;
    }
    return 'No schedule information available yet.';
  }

  // Event info
  if (msg.includes('tell me') || msg.includes('about') || msg.includes('info')) {
    return `Your event "${eventData?.eventName || 'Event'}" is a ${eventData?.category || 'event'} scheduled for ${eventData?.startDate || 'TBD'} at ${eventData?.venue || 'TBD'}. Status: ${eventData?.status || 'draft'}.`;
  }

  // Venue
  if (msg.includes('venue') || msg.includes('location')) {
    return `The event will be held at ${eventData?.venue || 'venue not set yet'}.`;
  }

  // Speakers
  if (msg.includes('speaker') || msg.includes('organizer')) {
    const count = eventData?.organizers?.length || 0;
    return count > 0 ? `You have ${count} speaker${count !== 1 ? 's' : ''}/organizer${count !== 1 ? 's' : ''} registered.` : 'No speakers added yet.';
  }

  // Sponsors
  if (msg.includes('sponsor')) {
    const count = eventData?.sponsors?.length || 0;
    return count > 0 ? `You have ${count} sponsor${count !== 1 ? 's' : ''} for this event.` : 'No sponsors added yet.';
  }

  // Announcement
  if (msg.includes('announcement') || msg.includes('notify')) {
    return 'To send an announcement, go to the Notifications page in your dashboard. I can help you draft the message if needed!';
  }

  // Default response
  return `I'm here to help you manage "${eventData?.eventName || 'your event'}"! You can ask me about:\n\n• Registration statistics\n• Ticket information\n• Event schedule\n• Speakers and sponsors\n• Venue details\n\nWhat would you like to know?`;
}

function buildEventContext(eventData) {
  if (!eventData) return "No event data available.";

  const context = [];

  // Basic info
  context.push(`Event Name: ${eventData.eventName || eventData.title || 'N/A'}`);
  context.push(`Category: ${eventData.category || 'N/A'}`);
  context.push(`Description: ${eventData.description || 'N/A'}`);
  context.push(`Venue: ${eventData.venue || 'N/A'}`);
  context.push(`Start Date: ${eventData.startDate || 'N/A'}`);
  if (eventData.endDate) context.push(`End Date: ${eventData.endDate}`);
  context.push(`Status: ${eventData.status || 'N/A'}`);

  // Registrations
  if (eventData.participants && eventData.participants.length > 0) {
    context.push(`\nRegistrations: ${eventData.participants.length} total`);
    
    // Count by team size if applicable
    if (eventData.category === 'hackathon') {
      const teamSizes = {};
      eventData.participants.forEach(p => {
        const size = p.teamSize || 'Unknown';
        teamSizes[size] = (teamSizes[size] || 0) + 1;
      });
      context.push(`Team breakdown: ${JSON.stringify(teamSizes)}`);
    }
  } else {
    context.push(`\nRegistrations: 0`);
  }

  // Tickets (for conferences/festivals)
  if (eventData.registrationSettings?.tickets) {
    context.push(`\nTicket Types:`);
    eventData.registrationSettings.tickets.forEach(ticket => {
      context.push(`- ${ticket.type}: $${ticket.price} ${ticket.currency || 'USD'}`);
    });
  }

  if (eventData.festival?.tickets) {
    context.push(`\nFestival Tickets:`);
    eventData.festival.tickets.forEach(ticket => {
      context.push(`- ${ticket.name}: $${ticket.price}`);
    });
  }

  // Schedule
  if (eventData.schedule && eventData.schedule.length > 0) {
    context.push(`\nSchedule: ${eventData.schedule.length} sessions`);
  }

  if (eventData.agenda && eventData.agenda.length > 0) {
    context.push(`\nAgenda: ${eventData.agenda.length} days planned`);
    eventData.agenda.forEach(day => {
      context.push(`Day ${day.day}: ${day.sessions?.length || 0} sessions`);
    });
  }

  // Speakers
  if (eventData.organizers && eventData.organizers.length > 0) {
    context.push(`\nOrganizers/Speakers: ${eventData.organizers.length}`);
  }

  // Sponsors
  if (eventData.sponsors && eventData.sponsors.length > 0) {
    context.push(`\nSponsors: ${eventData.sponsors.length}`);
  }

  // Inventory
  if (eventData.inventory) {
    context.push(`\nInventory:`);
    if (eventData.inventory.maxParticipants) {
      context.push(`- Max Participants: ${eventData.inventory.maxParticipants}`);
    }
    if (eventData.inventory.twinRooms) {
      context.push(`- Twin Rooms: ${eventData.inventory.twinRooms}`);
    }
    if (eventData.inventory.suites) {
      context.push(`- Suites: ${eventData.inventory.suites}`);
    }
  }

  // Contact
  if (eventData.contact) {
    context.push(`\nContact: ${eventData.contact.name || 'N/A'} (${eventData.contact.email || 'N/A'})`);
  }

  return context.join('\n');
}

module.exports = router;
