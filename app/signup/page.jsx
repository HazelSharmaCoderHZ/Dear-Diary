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
   <div className= "animatedbg">
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white/10 shd bg-opacity-50 backdrop-blur-md p-11 rounded-2xl  shadow-md text-center max-w-ls w-full">
        <h1 className="text-6xl font-bold mb-3 text-cyan-100">Create Your Account</h1>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full mb-3 bg-white/10 text-white placeholder-gray-300 border border-white/30 p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full mb-3 bg-white/10 text-white placeholder-gray-300 border border-white/30 p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-purple-500 text-white py-2 px-4 rounded-xl hover:bg-purple-300 transition w-50 border border-purple/30"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-cyan-100">
          Already have an account? {" "}
          <a href="/" className="text-cyan-300 underline hover:text-cyan-700">
            Go to Login
          </a>
        </p>
       
      </div>
    </div>
   </div>  
  );
}
