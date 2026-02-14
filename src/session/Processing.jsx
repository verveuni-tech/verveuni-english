import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Processing({ sessionId, onComplete }) {
  const hasCompletedRef = useRef(false);
  const analysisReadyRef = useRef(false);

  const [elapsed, setElapsed] = useState(0);

  const MIN_DISPLAY_TIME = 3; // seconds

  // ------------------------------------
  // Firestore Listener
  // ------------------------------------
  useEffect(() => {
    if (!sessionId) return;

    const sessionRef = doc(db, "sessions", sessionId);

    const unsubscribe = onSnapshot(sessionRef, (snapshot) => {
      if (!snapshot.exists()) return;

      const data = snapshot.data();

      if (
        data.status === "analyzed" &&
        data.analysis
      ) {
        analysisReadyRef.current = true;
      }
    });

    return () => unsubscribe();
  }, [sessionId]);

  // ------------------------------------
  // Timer + Controlled Navigation
  // ------------------------------------
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (
      !hasCompletedRef.current &&
      analysisReadyRef.current &&
      elapsed >= MIN_DISPLAY_TIME
    ) {
      hasCompletedRef.current = true;
      onComplete();
    }
  }, [elapsed, onComplete]);

  // ------------------------------------
  // Dynamic Messaging Logic
  // ------------------------------------
  let statusMessage = "Initializing audio signal analysis...";

  if (elapsed >= 2) {
    statusMessage = "Evaluating hesitation and pause patterns...";
  }

  if (elapsed >= 4) {
    statusMessage = "Interpreting speaking behavior...";
  }

  if (elapsed >= 6) {
    statusMessage = "Finalizing evaluation report...";
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="text-center space-y-6 max-w-sm">

        <div className="w-3 h-3 bg-white rounded-full animate-pulse mx-auto" />

        <div className="space-y-3">
          <p className="text-white/80 text-sm">
            {statusMessage}
          </p>

          <p className="text-white/40 text-xs">
            Estimated processing time: ~5 seconds
          </p>

          <p className="text-white/30 text-xs">
            {elapsed}s elapsed
          </p>
        </div>

      </div>
    </div>
  );
}
