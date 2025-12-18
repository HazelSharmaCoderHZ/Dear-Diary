"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import "react-calendar/dist/Calendar.css";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

export default function MoodMapPage() {
  const { currentUser } = useAuth();
  const [value, setValue] = useState(new Date());
  const [moods, setMoods] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    async function fetchMoods() {
      try {
        const moodsCollection = collection(db, "moods", currentUser.uid, "moods");
        const snap = await getDocs(moodsCollection);
        const moodsObj = {};
        snap.forEach((doc) => {
          moodsObj[doc.id] = doc.data().mood;
        });
        setMoods(moodsObj);
      } catch (e) {
        console.error("Error fetching moods:", e);
      } finally {
        // Reduced loader time for better UX, but kept the logic
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
      }
    }
    fetchMoods();
  }, [currentUser]);

  const Loader3 = () => (
    <div className=" min-h-screen flex flex-col md:flex-row justify-center items-center bg-white">
      <div className="loader3 mx-2"></div>
      <div className="loader3 mx-2"></div>
      <div className="loader3 mx-2"></div>
      <div className="loader3 mx-2"></div>
    </div>
  );

  const handleMood = async (mood) => {
    if (!selectedDate || !currentUser) return;
    const dateStr = selectedDate.toISOString().slice(0, 10);
    const moodRef = doc(db, "moods", currentUser.uid, "moods", dateStr);
    await setDoc(moodRef, { mood });
    setMoods((prev) => ({ ...prev, [dateStr]: mood }));
    setShowModal(false);
  };

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return null;
    return date.toISOString().slice(0, 10);
  };

  const getTileClass = ({ date, view }) => {
    if (view !== "month") return "";
    const dateStr = formatDate(date);
    const mood = moods[dateStr];

    // Using custom tailwind classes or the ones you defined in global.css
    if (mood === "good") return "mood-good transition-all duration-300 transform scale-95 rounded-full";
    if (mood === "average") return "mood-average transition-all duration-300 transform scale-95 rounded-full";
    if (mood === "bad") return "mood-bad transition-all duration-300 transform scale-95 rounded-full";
    return "hover:bg-purple-50 transition-colors rounded-full";
  };

  if (isLoading) return <Loader3 />;

  return (
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center justify-center p-6 text-slate-900">
      
      {/* 🔮 Background Magic */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-100/50 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-50/40 blur-[100px] -z-10" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800">
          Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-fuchsia-500">MoodMap</span>
        </h1>
        <p className="text-slate-500 mt-2 font-medium italic">Visualize your emotional journey through time.</p>
      </motion.div>

      {/* Calendar Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/70 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl shadow-purple-100 border border-white relative z-10"
      >
        <Calendar
          key={Object.keys(moods).join("-")} 
          locale="en-GB"
          onChange={setValue}
          value={value}
          onClickDay={(date) => {
            setSelectedDate(date);
            setShowModal(true);
          }}
          tileClassName={getTileClass}
          className="main-calendar-override"
        />

        {/* Legend */}
        <div className="mt-8 flex justify-center gap-6 text-xs font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-400"></span> Good</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-300"></span> Neutral</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-400"></span> Tough</div>
        </div>
      </motion.div>

      {/* Mood Selector Dialog */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-white/95 backdrop-blur-md rounded-[2rem] border-none shadow-2xl max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-800 text-center">
              Daily Pulse
            </DialogTitle>
            <p className="text-center text-slate-400 text-sm">How was {selectedDate?.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}?</p>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3 mt-6">
            <Button 
              onClick={() => handleMood("good")} 
              className="py-6 rounded-2xl bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition-all text-lg font-bold"
            >
              😊 Vibrant & Good
            </Button>
            <Button 
              onClick={() => handleMood("average")} 
              className="py-6 rounded-2xl bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200 transition-all text-lg font-bold"
            >
              😐 Just Fine
            </Button>
            <Button 
              onClick={() => handleMood("bad")} 
              className="py-6 rounded-2xl bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-all text-lg font-bold"
            >
              ☹️ A Bit Tough
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Back Button */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <Button
          onClick={() => router.push('/dashboard')}
          className="mt-12 bg-white text-slate-400 hover:text-purple-600 hover:bg-white px-8 py-6 rounded-2xl shadow-sm border border-slate-100 transition-all font-bold uppercase tracking-widest text-xs"
        >
          ← Return to Dashboard
        </Button>
      </motion.div>

      <style jsx global>{`
        .react-calendar {
          border: none !important;
          font-family: inherit !important;
          width: 100% !important;
          max-width: 400px;
        }
        .react-calendar__tile {
          padding: 1.5em 0.5em !important;
          font-weight: 600 !important;
        }
        .react-calendar__navigation button {
          font-weight: 800 !important;
          font-size: 1.2rem !important;
          color: #6366f1 !important;
        }
        /* Update these colors to match your global.css logic */
        .mood-good { background: #bbf7d0 !important; color: #166534 !important; }
        .mood-average { background: #fef08a !important; color: #854d0e !important; }
        .mood-bad { background: #fecaca !important; color: #991b1b !important; }
        .react-calendar__tile--now { background: #f3f4f6 !important; border-radius: 12px; }
        .react-calendar__tile--active { background: #818cf8 !important; color: white !important; border-radius: 12px; }
      `}</style>
    </div>
  );
}