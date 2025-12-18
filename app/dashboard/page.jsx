'use client';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseconfig";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/"); 
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#0a0a0a] text-white font-medium tracking-widest uppercase">
      Loading...
    </div>
  );

  return (
    <div className="relative min-h-screen w-full bg-[#0d0d12] overflow-hidden font-sans">
      
      {/* ✨ Improved Background: Blurry Mesh Gradients (Insta-Vibe) */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/30 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/20 blur-[100px]" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-pink-500/20 blur-[110px]" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-12"
        >
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Welcome to Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400">
              Diary
            </span>
          </h2>
          
          <div className="mt-6 space-y-2">
            <p className="text-lg sm:text-xl text-white/80 font-medium">
              Your thoughts are safe with us!
            </p>
            <p className="text-sm sm:text-base italic text-white/40 tracking-wide">
              “Journaling isn’t just writing — it’s therapy on paper”
            </p>
          </div>
        </motion.div>

        {/* ⭐ Optimized Button Grid (More compact & Readable) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
          <Link href="/write" className="w-full">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-white font-bold text-base flex items-center justify-center gap-3 transition-all shadow-xl"
            >
              <span className="text-xl">✍️</span> Pen Today’s Thought
            </motion.button>
          </Link>

          <Link href="/moodmap" className="w-full">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-white font-bold text-base flex items-center justify-center gap-3 transition-all shadow-xl"
            >
              <span className="text-xl">🌈</span> Your MoodMap
            </motion.button>
          </Link>

          <Link href="/viewnotes" className="w-full">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-white font-bold text-base flex items-center justify-center gap-3 transition-all shadow-xl"
            >
              <span className="text-xl">📖</span> Revisit Old Pages
            </motion.button>
          </Link>

          <Link href="/editnotes" className="w-full">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-white font-bold text-base flex items-center justify-center gap-3 transition-all shadow-xl"
            >
              <span className="text-xl">📝</span> Edit / Delete Past
            </motion.button>
          </Link>
        </div>

        {/* Back to Login */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => router.push("/")}
          className="mt-12 text-xs font-bold uppercase tracking-[0.2em] text-white/30 hover:text-cyan-400 cursor-pointer transition-all duration-300"
        >
          ⬅️ Logout to Home
        </motion.p>
      </div>
    </div>
  );
}