"use client";
import ArrowRight from "@/assets/arrow-right.svg";
// import Logo from "@/assets/logosaas.png";
import Logo from "../assets/logoblack.png";
import MenuIcon from "@/assets/menu.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Corrected import for app router

export const Header = () => {
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    router.push(`/#${sectionId}`);
  };
  const redirectToCalendly = () => {
    router.push("https://calendly.com/gauranshigupta2000");
  };
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <p className="text-white/60 hidden md:block">
          Streamline your workflow and boost your productivity
        </p>
        <div className="inline-flex gap-1 items-center">
          <p>Get started for free</p>
          <ArrowRight className="size-4 inline-flex justify-center items-center" />
        </div>
      </div>
      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <Image src={Logo} alt="Saas Logo" height={40} width={40} />
            <MenuIcon className="size-4 md:hidden" />
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <button onClick={() => scrollToSection("about")}>About</button>
              <button onClick={() => scrollToSection("features")}>
                Features
              </button>
              <button onClick={() => scrollToSection("projects")}>
                Projects
              </button>
              <button onClick={() => scrollToSection("customers")}>
                Customers
              </button>
              <button onClick={() => scrollToSection("contact")}>
                Contact
              </button>
              <button onClick={redirectToCalendly}>Book an Appointment</button>
              <Button className="tracking-tight">Get for free</Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
// "use client";
// import ArrowRight from "@/assets/arrow-right.svg";
// import Logo from "../assets/logoblack.png";
// import MenuIcon from "@/assets/menu.svg";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { useRouter } from "next/navigation"; // Corrected import for app router

// export const Header = () => {
//   const router = useRouter();

//   const scrollToSection = (sectionId: string) => {
//     router.push(`/#${sectionId}`);
//   };

//   const handleBooking = async () => {
//     try {
//       // Set up Calendly API headers and endpoint
//       const calendlyHeaders = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzI1ODUwMDczLCJqdGkiOiJjMDEyZmU5Ny0zMzA3LTQ1ZjktOGU3OS1iZDUxZDMyZGU2ZGYiLCJ1c2VyX3V1aWQiOiIxZDlkM2E2OS0yMTk4LTRlMjQtYWIzYS05NTZlZjZlYTljMWUifQ.Twn8IiljazqFuGV29KdwdUZZPR2Ew6BiOVplj1CyyVmdxKGPUsT3wIHTKSZvqXn0X8eOuC5vAqAKBLuqlXZ0-w`, // Replace with your actual access token
//       };

//       // Data for creating the event on Calendly
//       const calendlyEventData = {
//         // event_type: "https://api.calendly.com/event_types/YOUR_EVENT_TYPE_ID",
//         start_time: "2024-09-13T09:30:00", // Example start time
//         invitee: {
//           name: "John", // Example name
//           email: "john@example.com", // Example email
//         },
//       };

//       // Step 1: Schedule the event on Calendly
//       const calendlyResponse = await fetch(
//         "https://api.calendly.com/scheduled_events",
//         {
//           method: "POST",
//           headers: calendlyHeaders,
//           body: JSON.stringify(calendlyEventData),
//         }
//       );

//       if (!calendlyResponse.ok) {
//         throw new Error("Failed to schedule event on Calendly");
//       }

//       const eventDetails = await calendlyResponse.json();
//       console.log("eventDetails", eventDetails); // Log the event details for debugging purposes
//       const eventUri = eventDetails.resource.uri; // Get the event URI for invitee details

//       // Step 2: Fetch invitee details from Calendly
//       const inviteeResponse = await fetch(`${eventUri}/invitees`, {
//         method: "GET",
//         headers: calendlyHeaders,
//       });

//       if (!inviteeResponse.ok) {
//         throw new Error("Failed to fetch invitee details from Calendly");
//       }

//       const inviteeDetails = await inviteeResponse.json();
//       const invitee = inviteeDetails.collection[0]; // Get the first invitee's details

//       // Step 3: Save the event and invitee details to your database
//       const eventData = {
//         // eventType: "Meeting",
//         eventTime: "2024-09-13T09:30:00", // Example date and time
//         name: invitee.name,
//         email: invitee.email,
//       };

//       const dbResponse = await fetch("http://localhost:5000/api/save-event", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(eventData),
//       });

//       if (!dbResponse.ok) {
//         throw new Error("Failed to save event to the database");
//       }

//       console.log("Event saved successfully!");

//       // Redirect to Calendly's event confirmation page
//       router.push(eventDetails.resource.uri);
//     } catch (error) {
//       console.error("Error booking appointment:", error);
//     }
//   };

//   return (
//     <header className="sticky top-0 backdrop-blur-sm z-20">
//       <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
//         <p className="text-white/60 hidden md:block">
//           Streamline your workflow and boost your productivity
//         </p>
//         <div className="inline-flex gap-1 items-center">
//           <p>Get started for free</p>
//           <ArrowRight className="size-4 inline-flex justify-center items-center" />
//         </div>
//       </div>
//       <div className="py-5">
//         <div className="container">
//           <div className="flex items-center justify-between">
//             <Image src={Logo} alt="Saas Logo" height={40} width={40} />
//             <MenuIcon className="size-4 md:hidden" />
//             <nav className="hidden md:flex gap-6 text-black/60 items-center">
//               <button onClick={() => scrollToSection("about")}>About</button>
//               <button onClick={() => scrollToSection("features")}>
//                 Features
//               </button>
//               <button onClick={() => scrollToSection("projects")}>
//                 Projects
//               </button>
//               <button onClick={() => scrollToSection("customers")}>
//                 Customers
//               </button>
//               <button onClick={() => scrollToSection("contact")}>
//                 Contact
//               </button>
//               <button onClick={handleBooking}>Book an Appointment</button>
//               <Button className="tracking-tight">Get for free</Button>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };
