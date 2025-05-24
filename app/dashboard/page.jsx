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
      <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ duration: 1.5, delay: 0.5 }}
       className="mt-13 max-w-3xl px-6 sm:px-8 text-center"
       >
      <h2 className="text-4xl sm:text-5xl font-bold font-serif text-white relative inline-block pb-3 mb-5">
       Welcome to Your Diary
      <span className="block w-20 h-1 bg-white/60 mx-auto mt-2 rounded-full"></span>
      </h2>

       <p className="text-base sm:text-lg text-white/90 leading-relaxed">
       ✨ Your thoughts are safe with us ✨ <br></br>
        Studies show that journaling can ease anxiety,
       improve self-awareness, and even help you sleep better. By penning your feelings,
       you’re not just documenting moments — you’re nurturing your emotional well-being. <br></br>
       </p>
     </motion.div>


      <div className="flex flex-col sm:flex-row mt-7 gap-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/addnote")}
          className="bg-purple/300 bg-opacity-90 backdrop-blur-md hover:bg-purple-400 text-white px-8 py-4 rounded-2xl shadow-lg text-xl font-semibold transition duration-300"
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
