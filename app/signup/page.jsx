"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseconfig";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-100 via-rose-200 to-pink-100">
      <div className="bg-white p-10 rounded-2xl shadow-md text-center max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-4 text-rose-600">Create Your Account</h1>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full mb-4 border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full mb-4 border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-rose-500 text-white py-2 px-4 rounded-xl hover:bg-rose-600 transition w-full"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500">
          Already have an account? {" "}
          <a href="/" className="text-rose-600 underline hover:text-rose-800">
            Go to Login
          </a>
        </p>
      </div>
    </div>
  );
}
