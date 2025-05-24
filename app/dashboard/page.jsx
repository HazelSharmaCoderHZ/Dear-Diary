"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseconfig";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/"); // redirect to login if not authenticated
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="p-10 text-center text-white">Loading...</div>;

  return (
    <div className="secondpageanim">
     <div className="min-h-screen flex flex-col items-center justify-center text-white px-4">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl sm:text-6xl font-extrabold mb-10 text-center font-serif"
      >
        Welcome to Your Diary 
      </motion.h1>

      <div className="flex flex-col sm:flex-row gap-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/addnote")}
          className="bg-cyan-200 bg-opacity-50 backdrop-blur-md hover:bg-cyan-400 text-white px-8 py-4 rounded-2xl shadow-lg text-xl font-semibold transition duration-300"
        >
          ✍️ Pen Today’s Thought
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/viewnotes")}
          className="bg-purple/500 bg-opacity-50 backdrop-blur-md hover:bg-purple-500 text-white px-8 py-4 rounded-2xl shadow-lg text-xl font-semibold transition duration-300"
        >
          📖 Revisit Old Pages
        </motion.button>
      </div>
     </div> 
    </div>
  );
}
