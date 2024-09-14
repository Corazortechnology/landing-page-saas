const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { google } = require("googleapis");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  query: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// Google Calendar OAuth2 setup
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Set credentials using the refresh token
oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

// Function to create a Google Meet event
async function createGoogleMeetEvent(name, email) {
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  const eventStartTime = new Date();
  const eventEndTime = new Date();
  eventEndTime.setMinutes(eventStartTime.getMinutes() + 30); // Set a 30-min meeting

  const event = {
    summary: `Meeting with ${name}`,
    description: `Meeting to discuss query from ${name}`,
    start: {
      dateTime: eventStartTime,
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: eventEndTime,
      timeZone: "Asia/Kolkata",
    },
    attendees: [{ email: email }, { email: "Anant@corazor.com" }],
    conferenceData: {
      createRequest: {
        requestId: "random-string-to-ensure-uniqueness",
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
    });
    return response.data.hangoutLink;
  } catch (error) {
    console.error("Error creating Google Meet event:", error);
    throw error;
  }
}

// Contact form submission route
app.post("/api/contact", async (req, res) => {
  const { name, email, query } = req.body;

  try {
    // Save contact form details to MongoDB
    const newContact = new Contact({ name, email, query });
    await newContact.save();

    // Create Google Meet event
    const meetLink = await createGoogleMeetEvent(name, email);

    // Respond with success and meeting link
    res.status(201).json({
      message: "Contact saved successfully and Google Meet scheduled",
      meetLink: meetLink,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to save contact or schedule meet", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
