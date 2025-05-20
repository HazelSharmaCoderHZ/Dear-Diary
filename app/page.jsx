'use client';
import Link from "next/link";
import { motion } from 'framer-motion';

export default function LoginCard() {
  return (
    <div className="relative h-screen w-screen bg-black flex flex-col items-center justify-center text-white">

      {/* Menu Bar - Top Center */}
      <nav className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-10 text-white font-semibold text-lg">
        <Link href="/about" className="relative group hover:text-purple-300 transition duration-300">
          About
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-800 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link href="/contact" className="relative group hover:text-purple-300 transition duration-300">
          Contact Us
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-800 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </nav>

      {/* Center Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-7xl font-bold font-serif typewriter-loop">
          Dear Diary,<span className="animate-blink"></span>
        </h1>
        <p className="text-2xl italic tracking-wide mt-2">
          Write <span className="mx-1">|</span> Reflect <span className="mx-1">|</span> Grow
        </p>
      </motion.div>

      {/* Login Card */}
      <div className="bg-white text-black bg-opacity-100 border p-6 rounded-3xl shadow-2xl w-96 z-10">
        <h2 className="text-center text-lg font-semibold mb-3">LOGIN</h2>
        <form className="flex flex-col space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="bg-purple-800 text-white p-2 rounded hover:bg-purple-400 transition">
            🌙 Open My Diary
          </button>
          <p className="text-sm text-center mt-1">
            New user?{" "}
            <a href="/signup" className="text-purple-600 underline hover:text-purple-800">
              Sign up
            </a>
          </p>
        </form>
      </div>

    </div>
  );
}
