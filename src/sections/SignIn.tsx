"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://contact-backend-corazor.onrender.com/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log(data);

      // Save user info in localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Tell the app that login happened
      window.dispatchEvent(new Event("userInfoChanged"));

      // Redirect to homepage
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-black hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-800 transition"
          >
            Sign In
          </button>

          <div className="text-center mt-4">
            <p className="text-sm">
              Not registered?{" "}
              <Link
                href="/signup"
                className="text-black font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
