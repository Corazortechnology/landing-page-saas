"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const TermsAndConditions = () => {
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
      id="terms"
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
            Terms and Conditions
          </h1>
          <p className="mt-4 text-gray-600 text-base md:text-lg">
            Last updated: January 21, 2025
          </p>
        </div>
        <div className="mt-10">
          <article className="prose max-w-none text-justify md:text-lg text-gray-700">
            <p>
              Please read these terms and conditions carefully before using Our
              Service.
            </p>

            <h2 className="font-bold text-gray-800">
              Interpretation and Definitions
            </h2>
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
                <strong>Affiliate:</strong>means an entity that controls, is
                controlled by or is under common control with a party, where
                "control" means ownership of 50% or more of the shares, equity
                interest or other securities entitled to vote for election of
                directors or other managing authority.
              </li>
              <li>
                <strong>Country:</strong> Uttar Pradesh, India.
              </li>
              <li>
                <strong>Company:</strong> CORAZOR TECHNOLOGY PRIVATE LIMITED,
                14/1455-37, GHANTA GHAR, TRILOK CHAND JAIN MARKET, Saharanpur,
                Uttar Pradesh-247001.
              </li>
              <li>
                <strong>Device:</strong> Any device that can access the Service,
                such as a computer, cellphone, or digital tablet.
              </li>
              <li>
                <strong>Service:</strong> Refers to the Website.
              </li>
              <li>
                <strong>Terms and Conditions:</strong> The agreement that
                governs the use of the Service.
              </li>
              <li>
                <strong>Third-party Social Media Service:</strong> Content
                provided by third parties that may be included or made available
                through the Service.
              </li>
              <li>
                <strong>Website:</strong> Accessible from{" "}
                <a
                  href="https://www.corazor.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  www.corazor.com
                </a>
                .
              </li>
              <li>
                <strong>You:</strong> You means the individual accessing or
                using the Service, or the company, or other legal entity on
                behalf of which such individual is accessing or using the
                Service, as applicable.
              </li>
            </ul>

            <h2 className="font-bold text-gray-800">Acknowledgment</h2>
            <p>
              These Terms and Conditions govern the use of this Service and set
              out the rights and obligations of all users. Your access to and
              use of the Service is conditioned on Your acceptance and
              compliance with these Terms.
            </p>

            <h2 className="font-bold text-gray-800">Links to Other Websites</h2>
            <p>
              Our Service may contain links to third-party websites or services
              not owned by the Company. We are not responsible for their
              content, privacy policies, or practices.
            </p>

            <h2 className="font-bold text-gray-800">Termination</h2>
            <p>
              We may terminate or suspend your access immediately, without
              notice, for any reason, including breach of these Terms. Upon
              termination, your right to use the Service ceases immediately.
            </p>

            <h2 className="font-bold text-gray-800">Limitation of Liability</h2>
            <p>
              The Company's liability is limited to the amount paid by you
              through the Service or 100 USD if no payment was made. The Company
              is not liable for indirect damages, including data loss or
              interruption.
            </p>

            <h2 className="font-bold text-gray-800">
              "AS IS" and "AS AVAILABLE" Disclaimer
            </h2>
            <p>
              The Service is provided "AS IS" without warranties of any kind.
              The Company does not guarantee uninterrupted or error-free
              services.
            </p>

            <h2 className="font-bold text-gray-800">Governing Law</h2>
            <p>
              The laws of Uttar Pradesh, India, govern these Terms. You agree to
              resolve disputes informally before taking legal action.
            </p>

            <h2 className="font-bold text-gray-800">
              Changes to These Terms and Conditions
            </h2>
            <p>
              We reserve the right to modify these Terms at our sole discretion.
              If a revision is material, we will provide at least 30 days'
              notice. By continuing to use the Service, you agree to the updated
              Terms.
            </p>

            <h2 className="font-bold text-gray-800">Contact Us</h2>
            <p>
              If you have any questions, contact us at{" "}
              <a
                href="mailto:corazortechnology@gmail.com"
                className="text-blue-500 hover:underline"
              >
                corazortechnology@gmail.com
              </a>
              .
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};
