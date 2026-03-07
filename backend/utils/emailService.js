const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendRegistrationEmail = async (participantEmail, participantName, eventName, eventDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: participantEmail,
    subject: `Registration Confirmed - ${eventName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #7C3AED, #3B82F6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #7C3AED; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 You're Registered!</h1>
          </div>
          <div class="content">
            <h2>Welcome to ${eventName}!</h2>
            <p>Hi ${participantName},</p>
            <p>Your registration has been confirmed! We're excited to have you join us.</p>
            
            <div class="details">
              <h3>Event Details:</h3>
              <p><strong>Event:</strong> ${eventName}</p>
              <p><strong>Date:</strong> ${eventDetails.startDate}</p>
              <p><strong>Venue:</strong> ${eventDetails.venue}</p>
              ${eventDetails.startTime ? `<p><strong>Time:</strong> ${eventDetails.startTime}</p>` : ''}
            </div>
            
            <p>Get ready to build something amazing! We'll send you more details as the event approaches.</p>
            
            <center>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/event/${eventDetails.slug}" class="button">View Event Details</a>
            </center>
            
            <p>If you have any questions, feel free to reach out to us.</p>
            
            <p>Best regards,<br>The ${eventName} Team</p>
          </div>
          <div class="footer">
            <p>© 2025 EventSphere. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Registration email sent to ${participantEmail}`);
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendRegistrationEmail };
