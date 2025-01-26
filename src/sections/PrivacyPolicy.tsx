"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const PrivacyPolicy = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-[#F1F5FF] py-16 px-6 sm:px-12 md:px-20 overflow-x-clip"
      id="privacy-policy"
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
          <h1 className="text-4xl font-bold text-gray-800">Privacy Policy</h1>
          <p className="mt-4 text-gray-600 text-base md:text-lg">
            Last updated: January 21, 2025
          </p>
        </div>
        <div className="mt-10">
          <article className="prose max-w-none text-justify md:text-lg text-gray-700">
            <p>
              This Privacy Policy describes Our policies and procedures on the
              collection, use and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You.
            </p>
            <p>
              We use Your Personal data to provide and improve the Service. By
              using the Service, You agree to the collection and use of
              information in accordance with this Privacy Policy. This Privacy
              Policy has been created with the help of the{" "}
              <a
                href="https://www.termsfeed.com/privacy-policy-generator/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Privacy Policy Generator
              </a>
              .
            </p>

            <h2>Interpretation and Definitions</h2>
            <h3>Interpretation</h3>
            <p>
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </p>
            <h3>Definitions</h3>
            <ul>
              <li>
                <strong>Account</strong> means a unique account created for You
                to access our Service or parts of our Service.
              </li>
              <li>
                <strong>Affiliate</strong> means an entity that controls, is
                controlled by or is under common control with a party, where
                &quot;control&quot; means ownership of 50% or more of the
                shares, equity interest or other securities entitled to vote for
                election of directors or other managing authority.
              </li>
              <li>
                <strong>Company</strong> (referred to as either &quot;the
                Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot;
                in this Agreement) refers to CORAZOR TECHNOLOGY PRIVATE LIMITED,
                14/1455-37, GHANTA GHAR, TRILOK CHAND JAIN MARKET, Saharanpur,
                Saharanpur, Uttar Pradesh-247001.
              </li>
              <li>
                <strong>Cookies</strong> are small files that are placed on Your
                computer, mobile device or any other device by a website,
                containing the details of Your browsing history on that website
                among its many uses.
              </li>
              <li>
                <strong>Country</strong> refers to: Uttar Pradesh, India.
              </li>
              <li>
                <strong>Device</strong> means any device that can access the
                Service such as a computer, a cellphone or a digital tablet.
              </li>
              <li>
                <strong>Personal Data</strong> is any information that relates
                to an identified or identifiable individual.
              </li>
              <li>
                <strong>Service</strong> refers to the Website.
              </li>
              <li>
                <strong>Service Provider</strong> means any natural or legal
                person who processes the data on behalf of the Company.
              </li>
              <li>
                <strong>Usage Data</strong> refers to data collected
                automatically, either generated by the use of the Service or
                from the Service infrastructure itself.
              </li>
              <li>
                <strong>Website</strong> refers to CORAZOR TECHNOLOGY,
                accessible from{" "}
                <a
                  href="https://www.corazor.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  https://www.corazor.com/
                </a>
              </li>
              <li>
                <strong>You</strong> means the individual accessing or using the
                Service, or the company, or other legal entity on behalf of
                which such individual is accessing or using the Service, as
                applicable.
              </li>
            </ul>

            {/* Continue adding sections as provided */}
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, You can
              contact us:
            </p>
            <ul>
              <li>
                By email:{" "}
                <a
                  href="mailto:corazortechnology@gmail.com"
                  className="text-blue-500 hover:underline"
                >
                  corazortechnology@gmail.com
                </a>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
};
