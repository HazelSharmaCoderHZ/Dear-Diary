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
        router.push("/"); // redirect to login if not authenticated
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="p-10 text-center text-white">Loading...</div>;

  return (
    <div className="secondpageanim relative overflow-hidden">
    {/* Animated Bubbles */}
   <div className="bubble bg-cyan-300 w-28 h-28 top-13 left-17 animate-[float1_8s_ease-in-out_infinite]"></div>
   <div className="bubble bg-pink-300 w-20 h-20 top-47 left-49 animate-[float2_10s_ease-in-out_infinite]"></div>
   <div className="bubble bg-pink-300 w-21 h-21 bottom-47 right-55 animate-[float3_9s_ease-in-out_infinite]"></div>
   <div className="bubble bg-purple-400 w-20 h-20 top-88 left-22 animate-[float4_7s_ease-in-out_infinite]"></div>
   <div className="bubble bg-purple-400 w-21 h-21 bottom-88 right-24 animate-[float4_7s_ease-in-out_infinite]"></div>
   <div className="bubble bg-cyan-300 w-30 h-30 bottom-5 right-17 animate-[float5_11s_ease-in-out_infinite]"></div>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-start text-white px-4 pt-10 sm:pt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-4 sm:mt-10 max-w-3xl px-6 sm:px-8 text-center"
        >
          <h2 className="text-5xl sm:text-6xl font-extrabold font-serif text-white relative inline-block pb-2 mb-8">
            Welcome to Your{" "}
            <span className="text-cyan-200 drop-shadow-md">Diary</span>
            <span className="block w-20 h-0.5 bg-white/70 mx-auto mt-2 rounded-full"></span>
          </h2>

          <p className="text-base sm:text-xl text-white/90 leading-relaxed">
            Your thoughts are safe with us!
          </p>
          <p className="text-base sm:text-xl italic font-cursive text-white/80 mt-1 leading-relaxed">
            “Journaling isn’t just writing — it’s therapy on paper”
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row mt-12 gap-17">
          <Link href="/write">
           <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            
            className="bg-cyan/200 bg-opacity-90 backdrop-blur-md hover:bg-cyan-200 hover:text-black text-white px-8 py-4 rounded-2xl shadow-lg text-xl font-semibold transition duration-300"
           >
            ✍️ Pen Today’s Thought
           </motion.button> 
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/viewnotes")}
            className="bg-purple/500 bg-opacity-50 backdrop-blur-md hover:bg-cyan-200 text-white hover:text-black px-8 py-4 rounded-2xl shadow-lg text-xl font-semibold transition duration-300"
          >
            📖 Revisit Old Pages
          </motion.button>
        </div>

        <p
          onClick={() => router.push("/")}
          className="mt-11 text-sm text-white/70 hover:text-white cursor-pointer transition duration-300 underline"
        >
          ⬅️ Back to <span className="text-cyan-300">Login Page</span>
        </p>
      </div>
    </div>
  );
}
