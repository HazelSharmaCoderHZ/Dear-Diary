'use client';

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseconfig";
import { useRouter } from "next/navigation";

export default function ViewNotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/");
        return;
      }

      try {
        const notesCollectionRef = collection(db, "users", user.uid, "notes");
        const notesSnapshot = await getDocs(notesCollectionRef);
        const notesData = notesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        const sortedNotes = notesData.sort((a, b) =>
          (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)
        );
        setNotes(sortedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="p-6 text-white">Loading your notes...</div>;

  return (
    <div className="min-h-screen fourthpageanim px-4 py-12">
      <h1 className="text-6xl shd font-bold text-yellow-50 backdrop-blur-md text-center mb-18">📚 Your Past Notes</h1>
      {notes.length === 0 ? (
        <p className="text-center text-white">Oops! 😕 <br></br>No notes saved yet...<br></br>  To pen down and create your first note,  {' '} 
          <a href="/dashboard" className="text-cyan-300 underline hover:text-cyan-200">
                 Return
          </a>
 </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {notes.map((note, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md border border-grey rounded-xl shadow-md p-5  transition transform hover:scale-105  duration-200"
            >
              <p className="text-lg text-gray-100 mb-2">
                📅 <strong>Date:</strong> {note.date}
              </p>
              <p className="text-gray-900 text-xl mb-3 whitespace-pre-wrap">{note.note}</p>
              <p className="text-xs text-gray-100">
                ⏱️ Saved at: {note.timestamp?.toDate().toLocaleString("en-IN") || "Unknown"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
