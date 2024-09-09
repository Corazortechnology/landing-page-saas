"use client";

import CheckIcon from "@/assets/check.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const featuremap = [
  {
    title: "Custom Solutions",
    description:
      "Bespoke software development tailored exactly to your business needs, ensuring scalability, performance, and user satisfaction.",
    inverse: false,
  },
  {
    title: "Security & Compliance",
    description:
      "Implementing industry-standard security practices and compliance protocols to protect your data and privacy at every development phase.",
    inverse: true,
  },
  {
    title: "Agile Delivery",
    description:
      "Fast, iterative development processes that keep you in the loop and bring your product to market quicker without compromising quality.",
    inverse: false,
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-white" id="projects">
      <div className="container">
        <div className="max-w-[540px] mx-auto">
          <h2 className="section-title">Features</h2>
          <p className="section-description mt-5">
            {"You imagine the project, we bring it to life."}
          </p>
        </div>
        <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
          {featuremap.map(({ title, description, inverse }) => (
            <div
              key={title}
              className={cn(
                "p-10 border border-solid border-[$F1F1F1] rounded-3xl shadow-[0_7px_14px_#EAEAEA] max-w-xs w-full",
                { "border-black bg-black text-white": inverse === true }
              )}
            >
              <div className="flex items-baseline gap-1 mt-[30px]">
                <span className="text-4xl font-bold tracking-tighter leading-0">
                  {title}
                </span>
              </div>

              <div className="flex flex-col gap-5 mt-8">{description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
