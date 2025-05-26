'use client';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebaseconfig";

import { useRouter } from "next/navigation"; 
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";


export default function Login() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-100 via-rose-200 to-pink-100">
      <div className="bg-white p-10 rounded-2xl shadow-md text-center max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-4 text-rose-600">Welcome Back!</h1>
        <p className="mb-6 text-gray-600">Sign in to open your diary 💖</p>

        <button
          onClick={handleGoogleSignIn}
          className="bg-rose-500 text-white py-2 px-4 rounded-xl hover:bg-rose-600 transition w-full"
        >
          Sign in with Google
        </button>

        <button
          onClick={() => router.push("/")}
          className="mt-4 text-sm text-gray-500 underline hover:text-rose-400"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
