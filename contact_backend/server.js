///////////////////////////////////////////////////////////////////////////////////
// const express = require("express");
// const mongoose = require("mongoose");
// const { google } = require("googleapis");
// const cors = require("cors");
// const fs = require("fs").promises;
// const path = require("path");
// const process = require("process");
// const { authenticate } = require("@google-cloud/local-auth");
// require("dotenv").config();

// // Initialize the express app
// const app = express();
// app.use(express.json());
// app.use(cors());

// // MongoDB connection
// mongoose.connect(
//   "mongodb+srv://test:gauranshimongo@cluster0.x292jp4.mongodb.net/Corazor?retryWrites=true&w=majority"
// );

// // Define Mongoose schema and model for user queries
// const QuerySchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   query: String,
// });
// const Query = mongoose.models.Query || mongoose.model("Query", QuerySchema);

// // Scopes required for Google Calendar
// const SCOPES = ["https://www.googleapis.com/auth/calendar"];
// // Paths to store the credentials and tokens
// const TOKEN_PATH = path.join(process.cwd(), "token.json");
// const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

// // Set the redirect URI based on the environment
// const redirectUri =
//   process.env.NODE_ENV === "production"
//     ? "https://landing-page-rho-hazel.vercel.app"
//     : "http://localhost:3000/oauth2callback";

// /**
//  * Reads previously authorized credentials from the saved file.
//  * @return {Promise<OAuth2Client|null>}
//  */
// async function loadSavedCredentialsIfExist() {
//   try {
//     const content = await fs.readFile(TOKEN_PATH);
//     const credentials = JSON.parse(content);
//     return google.auth.fromJSON(credentials);
//   } catch (err) {
//     return null;
//   }
// }

// /**
//  * Saves OAuth2 credentials to a file.
//  * @param {OAuth2Client} client
//  * @return {Promise<void>}
//  */
// async function saveCredentials(client) {
//   const content = await fs.readFile(CREDENTIALS_PATH);
//   const keys = JSON.parse(content);
//   const key = keys.installed || keys.web;
//   const payload = JSON.stringify({
//     type: "authorized_user",
//     client_id: key.client_id,
//     client_secret: key.client_secret,
//     refresh_token: client.credentials.refresh_token,
//   });
//   await fs.writeFile(TOKEN_PATH, payload);
// }

// /**
//  * Authorizes the client and returns the OAuth2 client.
//  * If no credentials exist, it will prompt the user for authorization.
//  * @return {Promise<OAuth2Client>}
//  */
// async function authorize() {
//   let client = await loadSavedCredentialsIfExist();
//   if (client) {
//     return client;
//   }
//   client = await authenticate({
//     scopes: SCOPES,
//     keyfilePath: CREDENTIALS_PATH,
//   });
//   if (client.credentials) {
//     await saveCredentials(client);
//   }
//   return client;
// }

// /**
//  * Creates a Google Calendar event.
//  * @param {string} name
//  * @param {string} query
//  * @return {Promise<string>}
//  */
// async function createGoogleCalendarEvent(name, query) {
//   const auth = await authorize();
//   const calendar = google.calendar({ version: "v3", auth });

//   const event = {
//     summary: "Meeting with " + name,
//     description: query,
//     start: {
//       dateTime: new Date().toISOString(),
//       timeZone: "America/Los_Angeles",
//     },
//     end: {
//       dateTime: new Date(new Date().getTime() + 30 * 60 * 1000).toISOString(), // 30 minutes
//       timeZone: "America/Los_Angeles",
//     },
//     attendees: [{ email: "gauranshigupta2000@gmail.com" }],
//     conferenceData: {
//       createRequest: {
//         requestId: "sample123",
//         conferenceSolutionKey: { type: "hangoutsMeet" },
//       },
//     },
//   };

//   try {
//     const response = await calendar.events.insert({
//       calendarId: "primary",
//       resource: event,
//       conferenceDataVersion: 1,
//     });
//     console.log("response", response);
//     return response.data.hangoutLink;
//   } catch (error) {
//     throw new Error(`Error creating meeting: ${error.message}`);
//   }
// }

// app.post("/api/book-meet", async (req, res) => {
//   const { name, email, query } = req.body;

//   try {
//     // Save the query to MongoDB
//     const newQuery = new Query({ name, email, query });
//     await newQuery.save();
//     console.log(newQuery);
//     // Create a Google Calendar event
//     const meetLink = await createGoogleCalendarEvent(name, query);

//     // Respond with the meeting link
//     res.status(200).json({
//       message: "Meeting booked",
//       meetLink,
//     });
//   } catch (error) {
//     console.error("Error saving query to MongoDB:", error);
//     res
//       .status(500)
//       .json({ error: "Error booking meeting", details: error.message });
//   }
// });

// // Start the server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
///////////////////////////////////////////////////////////////////////////////////
const express = require("express");
const mongoose = require("mongoose");
const { google } = require("googleapis");
const cors = require("cors");
require("dotenv").config();

// Initialize the express app
const app = express();
app.use(express.json()); // Middleware to parse JSON

app.use(cors());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://test:gauranshimongo@cluster0.x292jp4.mongodb.net/Corazor?retryWrites=true&w=majority"
);

// Define Mongoose schema and model for user queries
const QuerySchema = new mongoose.Schema({
  name: String,
  email: String,
  query: String,
});
const Query = mongoose.models.Query || mongoose.model("Query", QuerySchema);

// Function to handle Google Calendar event creation
async function createGoogleCalendarEvent(name, query) {
  // const oAuth2Client = new google.auth.OAuth2(
  //   process.env.GOOGLE_CLIENT_ID,
  //   process.env.GOOGLE_CLIENT_SECRET,
  //   process.env.REDIRECT_URL
  // );
  const oAuth2Client = new google.auth.OAuth2(
    "350789775170-50ildho0kbb9ngmnd6oabu5frrgenvoj.apps.googleusercontent.com",
    "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",
    "http://localhost:3000/oauth2callback"
  );
  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  const event = {
    summary: "Meeting with " + name,
    description: query,
    start: {
      dateTime: new Date().toISOString(),
      timeZone: "America/Los_Angeles", // Adjust the time zone
    },
    end: {
      dateTime: new Date(new Date().getTime() + 30 * 60 * 1000).toISOString(), // 30 min duration
      timeZone: "America/Los_Angeles",
    },
    attendees: [{ email: "gauranshigupta2000@gmail.com" }],
    conferenceData: {
      createRequest: {
        requestId: "sample123",
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };
  console.log("event", event);
  try {
    const response = calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
    });
    console.log("response", response);
    return response.data.hangoutLink;
  } catch (error) {
    throw new Error(`Error creating meeting: ${error.message}`);
  }
}
app.post("/api/book-meet", async (req, res) => {
  const { name, email, query } = req.body;

  try {
    // Save the query to MongoDB
    const newQuery = new Query({ name, email, query });
    await newQuery.save();

    // Create a Google Calendar event
    const meetLink = await createGoogleCalendarEvent(name, query);

    // Respond with the meeting link
    res.status(200).json({
      message: "Meeting booked",
      meetLink,
    });
  } catch (error) {
    console.error("Error saving query to MongoDB:", error);
    res
      .status(500)
      .json({ error: "Error booking meeting", details: error.message });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
