// "use client";

// import { Button } from "@/components/ui/button";
// import ArrowRight from "@/assets/arrow-right.svg";
// import starImage from "@/assets/star.png";
// import springImage from "@/assets/spring.png";
// import Image from "next/image";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";
// import { useState } from "react";

// export const CallToAction = () => {
//   const sectionRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"],
//   });
//   const translateY = useTransform(scrollYProgress, [0, 1], [200, -200]);

//   // State to manage form fields
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     query: "",
//   });

//   const handleChange = (e: { target: { name: any; value: any } }) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     // Handle form submission (e.g., send to server or display a success message)
//     console.log(formData);
//   };

//   return (
//     <section
//       ref={sectionRef}
//       className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip"
//       id="contact"
//     >
//       <div className="container">
//         <div className="section-heading relative">
//           <h2 className="section-title">Contact Us</h2>
//           <p className="section-description mt-5">
//             Have a question or want to get in touch? Fill out the form below and
//             we'll get back to you shortly.
//           </p>
//           <motion.img
//             src={starImage.src}
//             alt="Star Image"
//             width={360}
//             className="absolute -left-[350px] -top-[137px]"
//             style={{ translateY: translateY }}
//           />
//           <motion.img
//             src={springImage.src}
//             alt="Spring Image"
//             width={360}
//             className="absolute -right-[331px] -top-[19px]"
//             style={{ translateY: translateY }}
//           />
//         </div>

//         {/* Contact Form */}
//         <form className="mt-10 max-w-lg mx-auto" onSubmit={handleSubmit}>
//           <div className="mb-6">
//             <label htmlFor="name" className="section-description mt-5">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-md max-w-lg mx-auto"
//               placeholder="Your Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="email" className="section-description mt-5">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-md max-w-lg mx-auto"
//               placeholder="your.email@example.com"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="query" className="section-description mt-5">
//               Your Query
//             </label>
//             <textarea
//               id="query"
//               name="query"
//               rows={4}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-md max-w-lg mx-auto"
//               placeholder="Type your message here..."
//               value={formData.query}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="flex gap-2 mt-10 justify-center">
//             <Button type="submit">Submit</Button>
//             <Button variant="ghost" className="gap-1">
//               <span>Learn more</span>
//               <ArrowRight className="size-5" />
//             </Button>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };
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
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle form submission (e.g., send to server or display a success message)
    console.log(formData);
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
        <form className="mt-10 max-w-lg mx-auto" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="section-description mt-5">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-md max-w-lg mx-auto"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="section-description mt-5">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-md max-w-lg mx-auto"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="query" className="section-description mt-5">
              Your Query
            </label>
            <textarea
              id="query"
              name="query"
              rows={4}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-md max-w-lg mx-auto"
              placeholder="Type your message here..."
              value={formData.query}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-2 mt-10 justify-center">
            <Button type="submit">Submit</Button>
            <Button variant="ghost" className="gap-1">
              <span>Learn more</span>
              <ArrowRight className="size-5" />
            </Button>
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
