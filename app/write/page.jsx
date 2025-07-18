'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/firebase/firebaseconfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function WritePage() {
  const [note, setNote] = useState('');
  const [userId, setUserId] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  
  useEffect(() => {
    const today = new Date();
    const weekday = today.toLocaleDateString('en-IN', { weekday: 'long' });
    const day = today.getDate().toString().padStart(2, '0');
    const month = today.toLocaleDateString('en-IN', { month: 'long' });
    const year = today.getFullYear();
    setFormattedDate(`${weekday} | ${day} ${month} | ${year}`);
  }, []);

  const saveNote = async () => {
    if (!note.trim()) return alert('Note cannot be empty!');
    const today = new Date().toISOString().split('T')[0];

    try {
      const notesRef = collection(db, 'users', userId, 'notes'); 
      await addDoc(notesRef, {
        note,
        date: today,
        timestamp: serverTimestamp(), 
      });
      
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Error saving note!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-gradient-to-br from-blue-500 via-grey-100 to-rose-300 flex flex-col items-center justify-center px-4">
      {formattedDate && (
        <p className="text-gray-600 text-lg sm:text-xl mb-2">{formattedDate}</p>
      )}
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-gray-800">
        📝 Write Your Thoughts for Today
      </h1>
      <textarea
        className="w-full max-w-4xl text-black box-shadow: 0 0 10px rgba(155, 89, 182, 0.3) h-78 p-4 rounded-xl border border-gray-300 bg-gradient-to-r from-white via-yellow-50 to-yellow-100 shadow-md resize-none text-lg"
        placeholder="Pour your heart here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <Link href="/saved">
        <button
          onClick={saveNote}
          className="mt-6 bg-purple-600 hover:bg-blue-400 hover:text-black text-white text-lg px-6 py-2 rounded-lg shadow-md"
        >
          ✅ Save Note
        </button>
      </Link>
    </div>
  );
}
