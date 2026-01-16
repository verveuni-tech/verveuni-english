import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Processing({ sessionId, onComplete }) {
  useEffect(() => {
    if (!sessionId) return;

    const sessionRef = doc(db, "sessions", sessionId);

    const unsubscribe = onSnapshot(sessionRef, (snapshot) => {
      if (!snapshot.exists()) return;

      const data = snapshot.data();

      if (data.status === "analyzed" && data.analysis) {
        onComplete(data.analysis);
      }
    });

    return () => unsubscribe();
  }, [sessionId, onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4 text-gray-600">
          Processing your session…
        </p>
      </div>
    </div>
  );
}
