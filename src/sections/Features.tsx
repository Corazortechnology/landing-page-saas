"use client";

import CheckIcon from "@/assets/check.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const featuremap = [
  {
    // title: "Custom Solutions",
    description:
     "Next-Gen App Development Our team of seasoned app developers is here to turn your vision into reality. We build apps that are more than just functional—they’re designed to deliver an immersive user experience. From enerprse-level apps to consumer-focused mobile solutions, we provide customized app development services across platforms like iOS and Android, ensuring your app is fast, secure, and ready to scale.",
    inverse: false,
  },
  {
    
    description:
      "Cutting-Edge Website Development Your website is more than just an online presence—it’s your digital identity. At Corazor Technology,we create stunning, responsive, and user-friendly websites that not only look good but perform exceptionally. Whether you need a dynamic e-commerce platform, a content-rich website, or a sleek portfolio, our developers bring your vision to life with clean code and modern design.",
    inverse: true,
  },
  {
   
    description:
     "AI-Powered Solutions The future of technology is artificial intelligence, and we are here to integrate it into your business. From predictive analytics to intelligent automation, our AI solutions are designed to help you optimize operations, enhance customer experiences, and drive growth. Whether you're looking for AI-driven chatbots, recommendation engines, or data insights, we have the tools to unlock new possibilities",
    inverse: false,
  },
  {
   
    description:
     "Blockchain for the Modern Business Blockchain is not just about cryptocurrencies—it's about revolutionizing industries with transparency,security, and decentralization. Our blockchain experts develop smart contract solutions, tokenization platforms, and secure transaction systems that redefine how you do business. Let us help you harness the potential of blockchain to streamline operations and create new revenue streams.",
    inverse: true,
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-white" id="projects">
      <div className="container">
        <div className="max-w-[540px] mx-auto md:mb-20 ">
          <h2 className="section-title">Our Expertise</h2>
          {/* <p className="section-description mt-5">
            {"You imagine the project, we bring it to life."}
          </p> */}
        </div>
        <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
          {featuremap.map(({  description, inverse }) => (
            <div
            key={description}
              className={cn(
                "p-10 border border-solid border-[$F1F1F1] rounded-3xl shadow-[0_7px_14px_#EAEAEA] max-w-xs w-full",
                { "border-black bg-black text-white": inverse === true }
              )}
            >
              <div className="flex flex-col gap-5 mt-0">{description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
