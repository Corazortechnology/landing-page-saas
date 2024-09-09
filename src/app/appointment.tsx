import React from "react";
import { useCalendlyEventListener, InlineWidget } from "react-calendly";

const Calendly = () => {
  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("Profile Page Viewed"),
    onDateAndTimeSelected: () => console.log("Date and Time Selected"),
    onEventTypeViewed: () => console.log("Event Type Viewed"),
    onEventScheduled: async (e) => {
      const eventDetails = e.data.payload;

      // Extract event and invitee URIs
      const eventUri = eventDetails.event.uri;
      const inviteeUri = eventDetails.invitee.uri;

      try {
        // Fetch event details from Calendly API
        const eventResponse = await fetch(eventUri, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzI1NTI1NTc1LCJqdGkiOiJjMmJhZmEwMS1lMzVkLTQwZGQtYjAxYS0xMmFmMTNlMTM5MGIiLCJ1c2VyX3V1aWQiOiIxZDlkM2E2OS0yMTk4LTRlMjQtYWIzYS05NTZlZjZlYTljMWUifQ.XC1iRCz8tXcTCQ30szs50yw5tTnUGQS675O2qy4-MtQyQ7HGfNVdEmEryyclJ_yPHpBR5cfe0kLFY_ez76sWVA`,
          },
        });

        if (!eventResponse.ok) {
          throw new Error("Failed to fetch event details");
        }

        const eventData = await eventResponse.json();

        // Fetch invitee details from Calendly API
        const inviteeResponse = await fetch(inviteeUri, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzI1NTI1NTc1LCJqdGkiOiJjMmJhZmEwMS1lMzVkLTQwZGQtYjAxYS0xMmFmMTNlMTM5MGIiLCJ1c2VyX3V1aWQiOiIxZDlkM2E2OS0yMTk4LTRlMjQtYWIzYS05NTZlZjZlYTljMWUifQ.XC1iRCz8tXcTCQ30szs50yw5tTnUGQS675O2qy4-MtQyQ7HGfNVdEmEryyclJ_yPHpBR5cfe0kLFY_ez76sWVA`,
          },
        });

        if (!inviteeResponse.ok) {
          throw new Error("Failed to fetch invitee details");
        }

        const inviteeData = await inviteeResponse.json();

        // Prepare the event data to be sent to the backend
        const eventDataToSave = {
          eventType: eventData.event_type?.name || "N/A",
          eventTime: eventData.start_time || "N/A",
          name: inviteeData.name || "N/A",
          email: inviteeData.email || "N/A",
        };

        // Send event data to your MongoDB backend API using fetch
        const response = await fetch("http://localhost:5000/api/save-event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventDataToSave),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.text();
        console.log("Event saved to the database:", eventDataToSave);
        console.log("Response from server:", result);
      } catch (error) {
        console.error("Error fetching event details or saving event:", error);
      }
    },
    onPageHeightResize: (e) =>
      console.log("Page Height Resized:", e.data.payload.height),
  });

  return (
    <div className="App">
      <InlineWidget url="https://calendly.com/gauranshigupta2000" />
    </div>
  );
};

export default Calendly;
