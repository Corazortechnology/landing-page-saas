"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logoblack.png";
import MenuIcon from "@/assets/menu.svg";
import { useRouter } from "next/navigation";

export const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");
    setUserInfo(stored);
    setIsLoggedIn(!!stored);
  
    const handleUserInfoChange = () => {
      const updated = localStorage.getItem("userInfo");
      setUserInfo(updated);
      setIsLoggedIn(!!updated);
    };
  
    window.addEventListener("userInfoChanged", handleUserInfoChange);
  
    return () => {
      window.removeEventListener("userInfoChanged", handleUserInfoChange);
    };
  }, []);
  
  // Now userInfo is in React state, you can watch it
  useEffect(() => {
    setIsLoggedIn(!!userInfo);
  }, [userInfo]);

  // Toggle dropdowns
  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  // Close dropdowns and mobile menu when clicking outside
  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    router.push("/signin");
  };

  // Prevent click events inside dropdowns or mobile menu from closing it
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="py-5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <Image src={Logo} alt="Logo" height={50} width={50} />
            </Link>

            {/* Hamburger Icon for Mobile */}
            <button
              onClick={(e) => {
                stopPropagation(e);
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="md:hidden"
            >
              <MenuIcon className="size-4" />
            </button>

            {/* Navigation Menu */}
            <nav
              ref={menuRef}
              className={`${
                isMobileMenuOpen ? "inline-block" : "hidden"
              } md:flex gap-6 items-center`}
              onClick={stopPropagation}
            >
              {/* Dropdown - Who We Are */}
              <div
                className="relative"
                onClick={(e) => {
                  stopPropagation(e);
                  toggleDropdown("whoWeAre");
                }}
              >
                <button className="flex items-center gap-2 text-black">
                  Who we are{" "}
                  <span>{activeDropdown === "whoWeAre" ? "^" : ">"}</span>
                </button>
                {activeDropdown === "whoWeAre" && (
                  <div
                    className="absolute bg-white shadow-lg rounded-md mt-2 border w-48"
                    onClick={stopPropagation}
                  >
                    <Link href="/about-us">
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        About Us
                      </div>
                    </Link>
                    <Link href="/team">
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Our Team
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Dropdown - Insights */}
              <div
                className="relative"
                onClick={(e) => {
                  stopPropagation(e);
                  toggleDropdown("features");
                }}
              >
                <button className="flex items-center gap-2 text-black">
                  Features{" "}
                  <span>{activeDropdown === "features" ? "^" : ">"}</span>
                </button>
                {activeDropdown === "features" && (
                  <div
                    className="absolute bg-white shadow-lg rounded-md mt-2 border w-48"
                    onClick={stopPropagation}
                  >
                    <Link href="/features">
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Features
                      </div>
                    </Link>
                    <Link href="/insights/news">
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        News
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Dropdown - What We Do */}
              <div
                className="relative"
                onClick={(e) => {
                  stopPropagation(e);
                  toggleDropdown("whatWeDo");
                }}
              >
                <button className="flex items-center gap-2 text-black">
                  What we do{" "}
                  <span>{activeDropdown === "whatWeDo" ? "^" : ">"}</span>
                </button>
                {activeDropdown === "whatWeDo" && (
                  <div
                    className="absolute bg-white shadow-lg rounded-md mt-2 border w-48"
                    onClick={stopPropagation}
                  >
                    <Link href="/what-we-do/industries">
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Industries
                      </div>
                    </Link>
                    <Link href="/what-we-do/services">
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Services
                      </div>
                    </Link>
                    <Link href="/what-we-do/products">
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Products
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Simple Links */}
              <Link href="/projects">
                <div className="text-black">Projects</div>
              </Link>
              <Link href="/contact">
                <div className="text-black">Contact</div>
              </Link>
              <Link href="/careers">
                <div className="text-black">Careers</div>
              </Link>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-black font-semibold border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
                >
                  Logout
                </button>
              ) : (
                <Link href="/signin">
                  <div className="text-black font-semibold border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition">
                    Sign In
                  </div>
                </Link>
              )}
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
