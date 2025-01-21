"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const ReturnAndRefundPolicy = () => {
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
      id="return-refund-policy"
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
            Return and Refund Policy
          </h1>
          <p className="mt-4 text-gray-600 text-base md:text-lg">
            Last updated: January 21, 2025
          </p>
        </div>
        <div className="mt-10">
          <article className="prose max-w-none text-justify md:text-lg text-gray-700">
            <p>
              Thank you for shopping at CORAZOR TECHNOLOGY PRIVATE LIMITED. If,
              for any reason, You are not completely satisfied with a purchase
              We invite You to review our policy on refunds and returns. This
              Return and Refund Policy has been created with the help of the{" "}
              <a
                href="https://www.privacypolicies.com/return-refund-policy-generator/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Return and Refund Policy Generator
              </a>
              .
            </p>
            <p>
              The following terms are applicable for any products that You
              purchased with Us.
            </p>

            <h2>Interpretation and Definitions</h2>
            <h3>Interpretation</h3>
            <p>
              The words of which the initial letter is capitalized have
              meanings defined under the following conditions. The following
              definitions shall have the same meaning regardless of whether
              they appear in singular or in plural.
            </p>
            <h3>Definitions</h3>
            <ul>
              <li>
                <strong>Company</strong> (referred to as either "the Company",
                "We", "Us" or "Our" in this Agreement) refers to CORAZOR
                TECHNOLOGY PRIVATE LIMITED, 14/1455-37, GHANTA GHAR, TRILOK
                CHAND JAIN MARKET, Saharanpur, Saharanpur, Uttar Pradesh-247001.
              </li>
              <li>
                <strong>Goods</strong> refer to the items offered for sale on
                the Service.
              </li>
              <li>
                <strong>Orders</strong> mean a request by You to purchase Goods
                from Us.
              </li>
              <li>
                <strong>Service</strong> refers to the Website.
              </li>
              <li>
                <strong>Website</strong> refers to CORAZOR TECHNOLOGY PRIVATE
                LIMITED, accessible from{" "}
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
                <strong>You</strong> means the individual accessing or using
                the Service, or the company, or other legal entity on behalf of
                which such individual is accessing or using the Service, as
                applicable.
              </li>
            </ul>

            <h2>Your Order Cancellation Rights</h2>
            <p>
              You are entitled to cancel Your Order within 7 days without
              giving any reason for doing so.
            </p>
            <p>
              The deadline for cancelling an Order is 7 days from the date on
              which You received the Goods or on which a third party you have
              appointed, who is not the carrier, takes possession of the
              product delivered.
            </p>
            <p>
              In order to exercise Your right of cancellation, You must inform
              Us of your decision by means of a clear statement. You can inform
              us of your decision by:
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
            <p>
              We will reimburse You no later than 14 days from the day on which
              We receive the returned Goods. We will use the same means of
              payment as You used for the Order, and You will not incur any
              fees for such reimbursement.
            </p>

            <h2>Conditions for Returns</h2>
            <p>
              In order for the Goods to be eligible for a return, please make
              sure that:
            </p>
            <ul>
              <li>The Goods were purchased in the last 7 days</li>
              <li>The Goods are in the original packaging</li>
            </ul>
            <p>The following Goods cannot be returned:</p>
            <ul>
              <li>
                The supply of Goods made to Your specifications or clearly
                personalized.
              </li>
              <li>
                The supply of Goods which according to their nature are not
                suitable to be returned, deteriorate rapidly or where the date
                of expiry is over.
              </li>
              <li>
                The supply of Goods which are not suitable for return due to
                health protection or hygiene reasons and were unsealed after
                delivery.
              </li>
              <li>
                The supply of Goods which are, after delivery, according to
                their nature, inseparably mixed with other items.
              </li>
            </ul>
            <p>
              We reserve the right to refuse returns of any merchandise that
              does not meet the above return conditions in our sole discretion.
            </p>
            <p>
              Only regular priced Goods may be refunded. Unfortunately, Goods
              on sale cannot be refunded. This exclusion may not apply to You
              if it is not permitted by applicable law.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about our Returns and Refunds Policy,
              please contact us:
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
