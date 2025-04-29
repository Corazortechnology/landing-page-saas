"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Job {
  id: number;
  title: string;
  type: "Full-time" | "Internship";
  location: string;
  description: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    type: "Full-time",
    location: "Bangalore",
    description: "Work on building beautiful UI in React.js",
  },
  {
    id: 2,
    title: "Backend Developer Intern",
    type: "Internship",
    location: "Remote",
    description: "Work with Node.js and APIs integration",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    type: "Full-time",
    location: "Mumbai",
    description: "Create beautiful user interfaces and experience flows.",
  },
  {
    id: 4,
    title: "Marketing Intern",
    type: "Internship",
    location: "Remote",
    description: "Assist marketing team with campaigns and research.",
  },
];

export default function Careers() {
  const [filter, setFilter] = useState<"All" | "Full-time" | "Internship">("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const filteredJobs = filter === "All" ? jobs : jobs.filter((job) => job.type === filter);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setIsLoggedIn(!!userInfo);
  }, []);

  const handleApplyClick = (job: Job) => {
    if (!isLoggedIn) {
      alert("Please sign in first to apply for a job.");
      router.push("/signin");
      return;
    }
    // Save job info in localStorage temporarily
    localStorage.setItem("selectedJob", JSON.stringify(job));
    // Redirect to application page
    router.push(`/careers/apply/${job.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Careers</h1>

      <div className="flex justify-center mb-6 gap-4">
        {["All", "Full-time", "Internship"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as "All" | "Full-time" | "Internship")}
            className={`px-4 py-2 rounded ${filter === f ? "bg-black text-white" : "bg-white border"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Job cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow p-6 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-500">{job.type} - {job.location}</p>
              <p className="mt-2">{job.description}</p>
            </div>
            <button
              onClick={() => handleApplyClick(job)}
              className="mt-6 bg-black text-white w-full py-2 rounded hover:bg-gray-800 transition self-end"
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
