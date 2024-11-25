"use client";

// import Image from "next/image";
// import integrationIcon from "@/assets/integration-icon.png"; // Replace with your actual image
// import trackingIcon from "@/assets/tracking-icon.png"; // Replace with your actual image

export const Projects = () => {
  return (
    <section className="py-24 bg-white" id="work">
      <div className="container">
        <div className="max-w-[540px] mx-auto text-center">
          <h2 className="section-title">Our Projects !</h2>
          <p className="section-description mt-5">
           
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mt-10">
          {/* Card 1 */}
          <div className="p-12 border border-solid border-gray-200 rounded-3xl shadow-md max-w-xs w-full text-center">
            {/* <Image
              src={trackingIcon}
              alt="Goal Setting and Tracking"
              className="mx-auto mb-6"
              width={100}
              height={100}
            /> */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Tailored Solutions
            </h3>
            <p className="text-sm text-gray-600 text-centre">
              No two businesses are the same, and neither are our solutions. We
              customize everything to fit your unique business goals.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-9 border border-solid border-gray-200 rounded-3xl shadow-md max-w-xs w-full text-center">
            {/* <Image
              src={trackingIcon}
              alt="Goal Setting and Tracking"
              className="mx-auto mb-6"
              width={100}
              height={100}
            /> */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Future-Ready Technology
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Our focus is on what’s next. We keep you ahead of the curve by
              implementing the latest in tech innovation.
            </p>
          </div>

          <div className="p-10 border border-solid border-gray-200 rounded-3xl shadow-md max-w-xs w-full text-center">
            {/* <Image
              src={trackingIcon}
              alt="Goal Setting and Tracking"
              className="mx-auto mb-6"
              width={100}
              height={100}
            /> */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Agility & Efficiency
            </h3>
            <p className="text-sm text-gray-600 text-center">
              We believe in quick turnarounds without sacrificing quality. Our
              agile process ensures that your project is delivered on time and
              beyond expectations.
            </p>
          </div>

          <div className="p-9 border border-solid border-gray-200 rounded-3xl shadow-md max-w-xs w-full text-center">
            {/* <Image
              src={trackingIcon}
              alt="Goal Setting and Tracking"
              className="mx-auto mb-6"
              width={100}
              height={100}
            /> */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Comprehensive Support
            </h3>
            <p className="text-sm text-gray-600 text-center">
              From ideation to post-launch maintenance, we provide end-to-end
              service that supports your business at every stage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
