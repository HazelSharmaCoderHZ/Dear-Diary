"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseconfig";
import { motion } from "framer-motion";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      alert("Signup failed: already existing user or weak password");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="loader2">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* LEFT SIDE: IMAGE */}
      <div className="relative hidden md:flex md:w-1/2 bg-purple-100 items-center justify-center overflow-hidden">
        <img
          src="/img1.png" // Ensure your image is in the public folder named img1.png
          alt="Journaling"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Soft Purple Overlay to blend with theme */}
        
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-20 bg-gradient-to-br from-white via-purple-50 to-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-800 mb-3">
              Create Account
            </h1>
            <p className="text-slate-500">
              Join our community of mindful writers today.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-white border border-purple-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 placeholder-slate-400 transition shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-white border border-purple-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 placeholder-slate-400 transition shadow-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-4"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-8 text-center text-slate-600">
            Already have an account?{" "}
            <a href="/login" className="text-purple-600 font-bold hover:underline underline-offset-4">
              Go to Login
            </a>
          </p>
          <p className="mt-1 text-center text-slate-600">
            
            <a href="/" className="text-purple-600 font-bold hover:underline underline-offset-4">
              Go back
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}