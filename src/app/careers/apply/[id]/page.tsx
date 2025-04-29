"use client";

import { useState, useEffect } from "react";

interface Job {
  id: number;
  title: string;
  type: string;
  location: string;
  description: string;
}

export default function ApplyJob({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<Job | null>(null);
  const [questionStep, setQuestionStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [currentInput, setCurrentInput] = useState("");

  const questions = [
    {
      id: 0,
      question: "Upload your Resume",
      type: "file",
      name: "resume",
    },
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
    const storedJob = localStorage.getItem("selectedJob");
    if (storedJob) {
      setJob(JSON.parse(storedJob));
    }
  }, []);

  const handleAnswerSubmit = () => {
    const currentQuestion = questions[questionStep];
    if (!currentInput) return;

    setAnswers((prev: any) => ({
      ...prev,
      [currentQuestion.name]: currentInput,
    }));
    setCurrentInput("");
    setQuestionStep((prev) => prev + 1);
  };

  const handleImmediateAnswer = (name: string, value: string) => {
    setAnswers((prev: any) => ({ ...prev, [name]: value }));
    setCurrentInput("");
    setQuestionStep((prev) => prev + 1);
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setResumeFile(file);
    setAnswers((prev: any) => ({ ...prev, resume: file.name }));
    setQuestionStep((prev) => prev + 1);
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded p-6 max-h-[90vh] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Apply for {job.title}
        </h1>

        {/* Show already filled answers */}
        {Object.keys(answers).length > 0 && (
          <div className="mb-6 bg-gray-50 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Your Answers:</h2>
            <ul className="space-y-2">
              {Object.entries(answers).map(([key, value]) => (
                <li key={key} className="text-gray-700">
                  <span className="font-semibold capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </span>{" "}
                  {String(value)}
                </li>
              ))}
            </ul>
          </div>
        )}

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
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
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
                      onChange={(e) =>
                        handleImmediateAnswer(q.name, e.target.value)
                      }
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}

            {q.type === "file" && idx === questionStep && (
              <input
                type="file"
                onChange={handleResumeUpload}
                accept=".pdf,.doc,.docx"
                className="w-full"
              />
            )}
          </div>
        ))}

        {questionStep >= questions.length && (
          <div className="text-center mt-6">
            <h3 className="text-green-600 font-bold">
              Thank you for applying!
            </h3>
            <p className="text-gray-700 mt-2">
              We have received your application.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
