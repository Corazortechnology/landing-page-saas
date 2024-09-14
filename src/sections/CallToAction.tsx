"use client";

import { Button } from "@/components/ui/button";
import ArrowRight from "@/assets/arrow-right.svg";
import starImage from "@/assets/star.png";
import springImage from "@/assets/spring.png";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [200, -200]);

  // State to manage form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "",
    date: "",
    time: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://landing-page-saas-pi.vercel.app/api/contact",
        {
          //"http://localhost:5000/api/contact"
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Sends formData with date and time
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(
          `Meeting Scheduled! Here is your Google Meet link: ${data.meetLink}`
        );
        setFormData({
          name: "",
          email: "",
          query: "",
          date: "",
          time: "",
        });
      } else {
        alert(`Failed to schedule the meeting: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong");
    }
  };

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip"
      id="contact"
    >
      <div className="container">
        <div className="section-heading relative">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-description mt-5">
            Have a question or want to get in touch? Fill out the form below and
            we&apos;ll get back to you shortly.
          </p>
          <motion.img
            src={starImage.src}
            alt="Star Image"
            width={360}
            className="absolute -left-[350px] -top-[137px]"
            style={{ translateY: translateY }}
          />
        </div>

        {/* Contact Form */}
        <form className="max-w-lg mx-auto " onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 shadow-md"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 shadow-md"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="query"
              className="block text-gray-700 font-bold mb-2"
            >
              Your Query
            </label>
            <textarea
              id="query"
              name="query"
              rows={4}
              className="bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 shadow-md"
              placeholder="Type your message here..."
              value={formData.query}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="date"
              className="block text-gray-700 font-bold mb-2"
            >
              Meeting Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 shadow-md"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="time"
              className="block text-gray-700 font-bold mb-2"
            >
              Meeting Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              className="bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 shadow-md"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-center gap-2 mt-6">
            <button
              type="submit"
              className="bg-black text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Spring Image moved below the form */}
        {/* <motion.img
          src={springImage.src}
          alt="Spring Image"
          width={360}
          className="hidden md:block absolute -right-32 -left-30 -top-92"
          style={{ translateY: translateY }}
        /> */}
        <motion.img
          src={springImage.src}
          alt="Spring Image"
          width={360} // Adjust width as necessary
          className="absolute right-[-2px] top-82 md:block hidden"
          style={{ translateY: translateY }}
        />
      </div>
    </section>
  );
};
