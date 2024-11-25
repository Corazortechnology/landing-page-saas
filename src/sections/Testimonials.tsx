"use client";

import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import avatar5 from "@/assets/avatar-5.png";
import avatar6 from "@/assets/avatar-6.png";
import avatar7 from "@/assets/avatar-7.png";
import avatar8 from "@/assets/avatar-8.png";
import avatar9 from "@/assets/avatar-9.png";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const testimonials = [
  {
    text: "I am very fortunate to have found the Corazor team for my project.The entire team Gaurav, Vaibhav, Anant, and their mentor Tushar was truly amazing.They were incredibly positive about everything; whatever features we required, they assured us with It’s our responsibility and delivered as promised. What sets them apart from others in the market is their genuine commitment to their values rather than just financial gain. It has been a pleasure working with you, and I look forward to future collaborations.",
    imageSrc: "",
    name: "Ankush Narag",
  },
  {
    text: "Happy to work with Corazor. Project executions and workflows are adhered as per situational suitability.It's very pleasing to work in a calming yet achieving environment.Thank you Tushar sir for your sweet and simple terms. Long term plans ahead are feeling attainable",
    imageSrc: "",
    name: "Gagan M G",
    // username: "@jjsmith",
  },
  {
    text: "Working with Corazor Technology has been an amazing experience! Their app development team created a seamless mobile app that our customers love.Highly recommend them!",
    imageSrc: "",
    name: "Rohan Mehta",
    // username: "@morganleewhiz",
  },
  {
    text: "The website Corazor Technology built for our business is exactly what we needed—responsive, fast, and visually stunning. Their professionalism and dedication stood out from day one!",
    imageSrc: "",
    name: "Aditi Singh",
   
  },
  {
    text: "I was looking for a reliable AI partner, and Corazor Technology delivered beyond my expectations. Their AI solutions have optimized our business processes like never before.",
    imageSrc: "",
    name: "Vikram Patel",
   
  },
  {
    text: "Corazor Technology made the blockchain integration process smooth and easy. Their expertise and ability to explain complex concepts in simple terms were impressive. Truly top-notch!",
    imageSrc: "",
    name: "Sana Kapoor",
  },
  {
    text: "The service from Corazor Technology was exceptional! Their team worked irelessly to deliver our project on time, and the final product exceeded all expectations. Great job!" ,
    imageSrc: "",
    name: "Ankit Desai",
    
  },
  {
    text: "The mobile app Corazor Technology built for us is flawless. Their team exceeded our expectations, delivering high-quality work within the deadline.Looking forward to more collaborations!",
    imageSrc: "",
    name: "David Roberts",
    
  },
  {
    text:"Corazor Technology revamped our website, and it has dramatically improved our online presence. The site is now faster, more attractive, and generates more leads than ever before.",
    imageSrc:"",
    name: "Emily Turner",
    
  },
  {
    text: "We needed help with blockchain implementation, and Corazor Technology delivered a solution that revolutionized our operations. Their expertise in blockchain is remarkable!",
    imageSrc:"",
    name: "Carlos Mendez",
    
  },
  {
    text: "Corazor Technology’s AI solutions have completely transformed how we interact with our customers. Our new chatbot has been a game-changer for customer service!",
    imageSrc:"",
    name: "Sophie White",
    
  },
  {
    text: "Their professionalism and knowledge in app development are outstanding.Corazor Technology delivered a highly functional app that met all our business needs. I highly recommend them!",
    imageSrc:"",
    name: "Mark Wilson",
    
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => (
  <div className={props.className} id="testimonials">
    <motion.div
      animate={{ translateY: "-50%" }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
        duration: props.duration || 10,
      }}
      className="flex flex-col gap-6 pb-6"
    >
      {[...new Array(2)].fill(0).map((_, index) => (
        <React.Fragment key={index}>
          {props.testimonials.map(({ text, imageSrc, name, username }) => (
            <div key={name} className="card">
              <div>{text}</div>
              <div className="flex items-center gap-2 mt-5">
                <Image
                  src={imageSrc}
                  alt={name}
                  width={40}
                  height={40}
                  className="size-10 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="font-medium tracking-tight leading-5">
                    {name}
                  </div>
                  <div className="leading-5 tracking-tight">{username}</div>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

export const Testimonials = () => {
  return (
    <section className="bg-white">
      <div className="container">
        <div className="section-heading">
          <div className="flex justify-center">
            <div className="tag">Testimonials</div>
          </div>
          <h2 className="section-title mt-5">What our users say</h2>
          <p className="section-description mt-5">
            From intuitive design to powerful features, our app has become an
            essential tool for users around the world.
          </p>
        </div>
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden md:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};
