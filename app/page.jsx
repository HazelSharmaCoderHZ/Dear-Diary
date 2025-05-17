'use client';
import Link from "next/link";
import { motion } from 'framer-motion';
import logincard from '../components/loginbox/logincard';

export default function LoginCard() {
  return (
    <div className="relative h-screen w-screen bg-black ">
      

      <nav className="absolute top-6 right-10 z-20 flex space-x-6 text-white font-semibold">
      <Link href="/about" 
       className="relative group text-white hover:text-purple-300 transition duration-300"
      > About
       <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-800 transition-all duration-300 group-hover:w-full"></span>
      </Link>

      <Link href="/contact" 
       className="relative group text-white hover:text-purple-300 transition duration-300"
      > Contact Us
       <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-800 transition-all duration-300 group-hover:w-full"></span>
      </Link>
      </nav>
      <img
        src="bg.png" 
        alt="Background"
        className="absolute top-0 left-0 h-full w-full object-cover z-0"
      />
      

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
      <div className="relative justify-center flex flex-col">
       <h1 className="absolute top-20 left-89 text-gray-100 rounded-7xl shadow-md drop-shadow-[0_0.3px_0.2px_rgba(0,0,0,0.3)] text-8xl font-bold z-5 font-serif typewriter-loop">
       Dear Diary,
       <span className="animate-blink"></span>
       </h1>
       <p className="text-3xl font-semibold text-white italic tracking-wide ml-117 mt-46 left-60">
       <span className="text-grey-100">Write |</span>
       <span className="text-grey-100"> Reflect </span>
       <span className="text-grey-100">| Grow</span>
       </p>
       </div>
      </motion.div>


      <div className="absolute bottom-10 right-15 bg-white bg-opacity-1 border-opacity-5 backdrop-blur-xl border p-5 rounded-3xl shadow-2xl z-10  w-[29rem]">
       <h2 className="text-center text-lg font-semibold mb-1">LOGIN</h2>
       <form className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-0.9 mb-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-0.9 mb-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-0.9 mb-2 border bg-white bg-opacity-40 border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button className="w-full bg-purple-900 text-white p-2 rounded hover:bg-purple-400 transition">
          🌙 Open My Diary
        </button>

        <p className="text-ls text-right mt-2">
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
