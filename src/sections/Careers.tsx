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
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [questionStep, setQuestionStep] = useState(0);
  const [answers, setAnswers] = useState<any>({}); // all saved answers
  const [currentInput, setCurrentInput] = useState(""); // for current step input only
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const filteredJobs = filter === "All" ? jobs : jobs.filter((job) => job.type === filter);

  const questions = [
    {
      id: 1,
      question: "What is your highest degree?",
      type: "input",
      name: "degree",
    },
    {
      id: 2,
      question: "How many years of experience do you have?",
      type: "select",
      name: "experience",
      options: ["0-1", "1-3", "3-5", "5+"],
    },
    {
      id: 3,
      question: "Preferred Work Mode?",
      type: "radio",
      name: "workMode",
      options: ["Remote", "On-site", "Hybrid"],
    },
    {
      id: 4,
      question: "Current Location?",
      type: "input",
      name: "location",
    },
    {
      id: 5,
      question: "Are you ready to join immediately?",
      type: "radio",
      name: "joinImmediately",
      options: ["Yes", "No"],
    },
  ];

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setIsLoggedIn(!!userInfo);
  }, []);

  const handleApplyClick = (job: Job) => {
    if (!isLoggedIn) {
      alert("Please sign in first to apply for a job."); // or you can redirect
      router.push("/signin");
      return;
    }

    setSelectedJob(job);
    setQuestionStep(0);
    setAnswers({});
    setCurrentInput("");
  };

  const handleAnswerSubmit = () => {
    const currentQuestion = questions[questionStep];
    if (!currentInput) return; // don't proceed if empty

    setAnswers((prev: any) => ({ ...prev, [currentQuestion.name]: currentInput }));
    setCurrentInput(""); // reset for next question
    setQuestionStep((prev) => prev + 1);
  };

  const handleImmediateAnswer = (name: string, value: string) => {
    setAnswers((prev: any) => ({ ...prev, [name]: value }));
    setQuestionStep((prev) => prev + 1);
    setCurrentInput(""); // clear input if any
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

      {/* Apply Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-2 right-4 text-gray-700 font-bold text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">Apply for {selectedJob.title}</h2>

            {/* Progressive Questions */}
            {questions.slice(0, questionStep + 1).map((q, idx) => (
              <div key={q.id} className="mb-6">
                <label className="block font-semibold mb-2">{q.question}</label>

                {q.type === "input" && idx === questionStep && (
                  <>
                    <input
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      className="w-full border px-4 py-2 rounded focus:outline-none"
                      placeholder="Enter your answer"
                    />
                    <button
                      onClick={handleAnswerSubmit}
                      className="mt-3 bg-black text-white w-full py-2 rounded hover:bg-gray-800 transition"
                    >
                      Submit
                    </button>
                  </>
                )}

                {q.type === "select" && idx === questionStep && (
                  <select
                    onChange={(e) => handleImmediateAnswer(q.name, e.target.value)}
                    className="w-full border px-4 py-2 rounded focus:outline-none"
                  >
                    <option value="">Select</option>
                    {q.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}

                {q.type === "radio" && idx === questionStep && (
                  <div className="flex flex-wrap gap-4">
                    {q.options?.map((opt) => (
                      <label key={opt} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={q.name}
                          value={opt}
                          onChange={(e) => handleImmediateAnswer(q.name, e.target.value)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Completion */}
            {questionStep >= questions.length && (
              <div className="text-center mt-6">
                <h3 className="text-green-600 font-bold">Thank you for applying!</h3>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
