"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
export default function CustomerPage() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  return (
    <>
      <section
        ref={sectionRef}
        className="bg-gradient-to-b from-white to-[#F1F5FF] py-16 px-6 sm:px-12 md:px-20 overflow-x-clip"
        id="customer-page"
      >
        <div className="container mx-auto relative">
          {/* Animated background elements */}
          <motion.div
            style={{ translateY }}
            className="hidden md:block absolute -left-32 top-10"
          >
            <div className="bg-[#D2DCFF] h-48 w-48 rounded-full blur-xl"></div>
          </motion.div>
          <motion.div
            style={{ translateY }}
            className="hidden md:block absolute -right-32 bottom-10"
          >
            <div className="bg-[#D2DCFF] h-48 w-48 rounded-full blur-xl"></div>
          </motion.div>

          {/* Main Content */}
          <div className="max-w-[800px] mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome to CORAZOR TECHNOLOGY
            </h1>
            <p className="mt-4 text-gray-600 text-base md:text-lg">
              Empowering businesses with cutting-edge technology solutions.
            </p>
          </div>
          <div className="mt-10">
            <article className="prose max-w-none text-justify md:text-lg text-gray-700">
              <p>
                At <strong>CORAZOR TECHNOLOGY PRIVATE LIMITED</strong>, we
                believe in delivering innovative and reliable technology
                solutions tailored to your needs. Our customer-centric approach
                ensures that every service we provide aligns perfectly with your
                goals and expectations.
              </p>
              <h2>Why Choose Us?</h2>
              <ul>
                <li>
                  <strong>Expert Solutions:</strong> Advanced and scalable
                  technology services for diverse industries and requirements.
                </li>
                <li>
                  <strong>Customer-Centric Approach:</strong> Your satisfaction
                  is our priority, and we strive to exceed your expectations.
                </li>
                <li>
                  <strong>Quality Assurance:</strong> High standards and
                  reliable solutions every time.
                </li>
                <li>
                  <strong>Affordable Pricing:</strong> Competitive rates without
                  compromising quality.
                </li>
              </ul>

              <h2>Contact Us</h2>
              <p>
                We’re excited to collaborate with you and provide innovative
                technology solutions. Reach out to us to learn more or discuss
                your requirements.
              </p>
              <ul>
                <li>
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:+917060588586"
                    className="text-blue-500 hover:underline"
                  >
                    +91 70605 88586
                  </a>
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:corazortechnology@gmail.com"
                    className="text-blue-500 hover:underline"
                  >
                    corazortechnology@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Address:</strong> CORAZOR TECHNOLOGY PRIVATE LIMITED,
                  14/1455-37, GHANTA GHAR, TRILOK CHAND JAIN MARKET, Saharanpur,
                  Uttar Pradesh - 247001
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
