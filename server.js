// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// // Create express app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect(
//   "mongodb+srv://test:gauranshimongo@cluster0.x292jp4.mongodb.net/Corazor?retryWrites=true&w=majority"
// );
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("Connected to the database");
// });
// // Define schema and model for the events
// const eventSchema = new mongoose.Schema({
//   eventType: String,
//   eventTime: String,
//   name: String,
//   email: String,
// });

// const Event = mongoose.model("Event", eventSchema);

// // Define API endpoint to save event details
// app.post("/api/save-event", async (req, res) => {
//   const { eventType, eventTime, name, email } = req.body;

//   const newEvent = new Event({
//     eventType,
//     eventTime,
//     name,
//     email,
//   });

//   try {
//     await newEvent.save();
//     res.status(201).send("Event saved successfully!");
//     // console.log(res);
//   } catch (err) {
//     res.status(500).send("Error saving event: " + err.message);
//   }
// });

// // Start the server
// app.listen(5000, () => {
//   console.log("Server started on port 5000");
// });
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});

// Define schema and model for the events
const eventSchema = new mongoose.Schema({
  //   eventType: String,
  eventTime: String,
  name: String,
  email: String,
});

const Event = mongoose.model("Event", eventSchema);

// Define API endpoint to save event details from Calendly webhook
app.post("/api/save-event", async (req, res) => {
  const { eventTime, name, email } = req.body;

  const newEvent = new Event({
    // eventType,
    eventTime,
    name,
    email,
  });

  try {
    await newEvent.save();
    res.status(201).send("Event saved successfully!");
  } catch (err) {
    res.status(500).send("Error saving event: " + err.message);
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
