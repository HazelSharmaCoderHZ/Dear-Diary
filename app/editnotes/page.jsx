'use client';

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/firebaseconfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { deleteDoc } from "firebase/firestore"; 



export default function EditNotesPage() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/");
      } else {
        setUser(currentUser);
        const notesRef = collection(db, "users", currentUser.uid, "notes");
        const snapshot = await getDocs(notesRef);
        const userNotes = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(userNotes);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const startEditing = (note) => {
    setEditingNoteId(note.id);
    setEditedText(note.note);
  };

  const saveEdit = async (noteId) => {
    const noteRef = doc(db, "users", user.uid, "notes", noteId);
    await updateDoc(noteRef, { note: editedText });

    setNotes(notes.map(n => n.id === noteId ? { ...n, note: editedText } : n));
    setEditingNoteId(null);
    setEditedText("");
  };

  if (loading) {
    return <div className="p-8 text-white text-center">Loading your notes...</div>;
  }
  const deleteNote = async (noteId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this note?");
  if (!confirmDelete) return;

  const noteRef = doc(db, "users", user.uid, "notes", noteId);
  await deleteDoc(noteRef);
  setNotes(notes.filter((n) => n.id !== noteId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-cyan-500 p-8 text-white">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 font-serif">📝 Edit Your Past Notes</h1>

      {notes.length === 0 ? (
        <div className="text-center text-white/90 text-lg mt-20">
              <p className="text-center text-white">Oops! 😕 <br></br>No notes saved yet...<br></br>  To pen down and create your first note,  {' '} 
               <a href="/dashboard" className="text-cyan-300 underline hover:text-cyan-200">
                 Return
               </a>
              </p>
        </div>
      ) : (
        <div className="space-y-6 max-w-3xl mx-auto">
          {notes.map((note, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md border border-grey rounded-xl shadow-md p-5 transition transform hover:scale-105 duration-200"
            >
              <p className="text-lg text-gray-100 mb-2">
                📅 <strong>Date:</strong> {note.date}
              </p>

              {editingNoteId === note.id ? (
                <>
                  <textarea
                    className="w-full h-32 p-3 text-black rounded-md"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <button
                    onClick={() => saveEdit(note.id)}
                    className="mt-3 px-4 py-2 bg-green-400 text-black font-semibold rounded-md hover:bg-green-500 transition"
                  >
                    💾 Save
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-900 text-xl mb-3 whitespace-pre-wrap">{note.note}</p>
                  <button
                    onClick={() => startEditing(note)}
                    className="px-4 py-2 bg-yellow-300 text-black font-semibold rounded-md hover:bg-yellow-400 transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="mt-2 ml-3 px-3 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
                  >
                    🗑️ Delete
                  </button>

                </>
              )}

              <p className="text-xs text-gray-100 mt-3">
                ⏱️ Saved at: {note.timestamp?.toDate().toLocaleString("en-IN") || "Unknown"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
