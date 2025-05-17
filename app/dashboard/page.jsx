"use client";
// app/dashboard/page.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseconfig";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/"); // redirect to home/login if not authenticated
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Welcome to Your Dashboard! 🎉</h1>
    </div>
  );
}
