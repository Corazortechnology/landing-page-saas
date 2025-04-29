"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface OtpArray extends Array<string> {}

export default function SignupWithOtp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otpScreen, setOtpScreen] = useState(false);
  const [otp, setOtp] = useState<OtpArray>(new Array(4).fill("")); // your OTP is 4 digits
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://contact-backend-corazor.onrender.com/api/v1/otp/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setSuccess(`OTP sent to ${email}`);
      setOtpScreen(true);
    } catch (err: any) {
      setError(err.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtpAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const enteredOtp = otp.join("");

    try {
      // Step 1: Verify OTP
      const verifyResponse = await fetch(
        "https://contact-backend-corazor.onrender.com/api/v1/otp/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: enteredOtp }),
        }
      );

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        throw new Error(verifyData.message || "OTP Verification failed");
      }

      // Step 2: Register User after successful OTP
      const registerResponse = await fetch(
        "https://contact-backend-corazor.onrender.com/api/v1/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            phone,
            email,
            password,
            confirmPassword,
          }),
        }
      );

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        throw new Error(registerData.message || "Signup failed");
      }

      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpInput = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "") {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "") {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {!otpScreen ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>

            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none"
            />

            <input
              type="tel"
              placeholder="Phone (+91 9876543210)"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <button
              type="submit"
              className="bg-black text-white w-full py-2 rounded font-semibold hover:bg-gray-800 transition"
            >
              {loading ? "Sending OTP..." : "Continue"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtpAndRegister} className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Enter OTP</h2>

            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpInput(e.target.value, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  className="w-10 h-10 text-center border rounded focus:outline-none"
                />
              ))}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <button
              type="submit"
              className="bg-black text-white w-full py-2 rounded font-semibold hover:bg-gray-800 transition"
            >
              {loading ? "Verifying..." : "Verify & Register"}
            </button>
          </form>
        )}
        <div className="text-center mt-4">
            <p className="text-sm">
              Already registered?{" "}
              <Link href="/signin" className="text-black font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
      </div>
    </div>
  );
}
