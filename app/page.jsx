'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseconfig";
import { motion } from 'framer-motion';

export default function LoginCard() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="firstpageanim">
      <div className="relative h-screen w-screen flex flex-col items-center justify-center text-white overflow-hidden">
        
        {/* Top Navigation Bar */}
        <div className="absolute top-3 flex justify-center w-full my-0.3 z-20">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-8 py-2 flex space-x-8 shadow-lg">
            <Link href="/about" className="hover:text-cyan-300 font-semibold transition duration-300">
              About
            </Link>
            <Link href="/contact" className="hover:text-cyan-300 font-semibold transition duration-300">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-10"
        >
          <h1 className="text-8xl sm:text-8.5xl mt-12 font-extrabold text-grey-100 font-serif typewriter-loop">
            Dear Diary,<span className="animate-blink"></span>
          </h1>
          <p className="text-2xl sm:text-2xl italic tracking-wide font-bold mt-2 text-cyan-200 drop-shadow-xl">
            Write <span className="mx-1">|</span> Reflect <span className="mx-1">|</span> Grow
          </p>
        </motion.div>

        {/* Login Box */}
        <div className="bg-white/10 backdrop-blur-md text-black px-10 py-4 rounded-3xl shadow-xl w-[450px] sm:w-[500px] z-10 mt-4">
          <h2 className="text-center text-lg font-bold mb-3">LOGIN</h2>
          <form onSubmit={handleLogin} className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 bg-purple-450 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border bg-purple-450 border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button type="submit" className="bg-cyan-600 w-50 mx-auto text-white p-2 rounded hover:bg-cyan-400 transition">
              🌙 Open My Diary
            </button>
            <p className="text-ls text-center mt-1">
              New user?{" "}
              <a href="/signup" className="text-cyan-600 underline hover:text-cyan-500">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
