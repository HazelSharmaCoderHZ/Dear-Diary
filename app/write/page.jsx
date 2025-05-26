'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/firebase/firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

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

  // Format date only after the component mounts (client side only)
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
      await setDoc(doc(db, 'users', userId, 'notes', today), {
        note,
        date: today,
        timestamp: new Date(),
      });
      alert('Note saved successfully!');
      router.push('/dashboard');
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
        className="w-full max-w-4xl box-shadow: 0 0 10px rgba(155, 89, 182, 0.3) h-78 p-4 rounded-xl border border-gray-300 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-200 shadow-md resize-none text-lg"
        placeholder="Pour your heart here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        onClick={saveNote}
        className="mt-6 bg-purple-600 hover:bg-purple-300 hover:text-black  text-white text-lg px-6 py-3 rounded-lg shadow-md"
      >
        Save Note
      </button>
    </div>
  );
}
