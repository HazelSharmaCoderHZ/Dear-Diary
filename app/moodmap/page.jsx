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

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

export default function MoodMapPage() {
  const { currentUser } = useAuth();
  const [value, setValue] = useState(new Date());
  const [moods, setMoods] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); 

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  useEffect(() => {
    if (!currentUser) return;
    async function fetchMoods() {
      const moodsCollection = collection(db, "moods", currentUser.uid, "moods");
      const snap = await getDocs(moodsCollection);
      const moodsObj = {};
      snap.forEach((doc) => {
        moodsObj[doc.id] = doc.data().mood;
      });
      setMoods(moodsObj);
    }
    fetchMoods();
  }, [currentUser]);

  const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); 

   
  const Loader3 = () => (
    <div className="fourthpageanim min-h-screen flex flex-col md:flex-row justify-center items-center">
    <div className="loader3"></div>
    <div className="loader3"></div>
    <div className="loader3"></div>
    <div className="loader3"></div>
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

    if (mood === "good") return "mood-good";
    if (mood === "average") return "mood-average";
    if (mood === "bad") return "mood-bad";
    return "";
  };
  if (isLoading) return <Loader3 />;

  return (
    <div className="min-h-screen fourthpageanim bg-gradient-to-r from-purple-800 to-indigo-900 text-white flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl text-cyan-100 font-bold">🌈 Your Safe Place
        </h1>

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
        />

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="bg-white text-black rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                How was your mood on {selectedDate?.toDateString()}?
              </DialogTitle>
            </DialogHeader>
            <div className="flex justify-between gap-2 mt-4">
              <Button onClick={() => handleMood("good")} className="bg-green-500 hover:bg-green-600">Good 😊</Button>
              <Button onClick={() => handleMood("average")} className="bg-yellow-400 hover:bg-yellow-500 text-black">Average 😐</Button>
              <Button onClick={() => handleMood("bad")} className="bg-red-500 hover:bg-red-600">Bad ☹️</Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button
        onClick={goToDashboard}
        className=" bg-transparent text-black hover:text-cyan-200 hover:bg-transparent px-4 py-1 rounded-md"
      >
        ⬅️ Go Back
      </Button>
      </div>
    </div>
  );
}
