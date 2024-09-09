"use client";

// import Image from "next/image";
// import integrationIcon from "@/assets/integration-icon.png"; // Replace with your actual image
// import trackingIcon from "@/assets/tracking-icon.png"; // Replace with your actual image

export const Projects = () => {
  return (
    <section className="py-24 bg-white" id="features">
      <div className="container">
        <div className="max-w-[540px] mx-auto text-center">
          <h2 className="section-title">Streamlined for easy management</h2>
          <p className="section-description mt-5">
            Enjoy customizable lists, teamwork tools, and smart tracking all in
            one place. Set tasks, get reminders, and see your progress simply
            and quickly.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mt-10">
          {/* Card 1 */}
          <div className="p-10 border border-solid border-gray-200 rounded-3xl shadow-md max-w-xs w-full text-center">
            {/* <Image
              src={integrationIcon}
              alt="Integration Ecosystem"
              className="mx-auto mb-6"
              width={100}
              height={100}
            /> */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Integration ecosystem
            </h3>
            <p className="text-sm text-gray-600">
              Enhance your productivity by connecting with your favorite tools,
              keeping all your essentials in one place.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-10 border border-solid border-gray-200 rounded-3xl shadow-md max-w-xs w-full text-center">
            {/* <Image
              src={trackingIcon}
              alt="Goal Setting and Tracking"
              className="mx-auto mb-6"
              width={100}
              height={100}
            /> */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Goal setting and tracking
            </h3>
            <p className="text-sm text-gray-600">
              Define and track your goals, breaking down objectives into
              achievable tasks to keep your targets in sight.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
