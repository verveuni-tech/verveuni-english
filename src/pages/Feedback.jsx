import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";

import { db } from "../lib/firebase";
import { interpretSession } from "../lib/interpretSession";
import { saveInterpretedFeedback } from "../lib/feedbackStore";
import FeedbackUI from "../components/FeedbackUI";

export default function FeedbackPage() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    const ref = doc(db, "sessions", sessionId);

    const unsub = onSnapshot(ref, async (snap) => {
      if (!snap.exists()) return;

      const data = snap.data();
      setSession(data);

      if (
        data.status === "completed" &&
        data.analysis &&
        !data.interpretedFeedback
      ) {
        const insights = interpretSession(data.analysis);
        await saveInterpretedFeedback(sessionId, insights);
      }
    });

    return () => unsub();
  }, [sessionId]);

  // ---------------------------------------
  // Loading state
  // ---------------------------------------
  if (!session || session.status !== "completed") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse mx-auto" />
          <p className="text-white/70 text-sm">
            Generating evaluation report...
          </p>
        </div>
      </div>
    );
  }

  const analysis = session.analysis ?? {};

  const insights =
    session.interpretedFeedback ??
    interpretSession(analysis);

  const scores = analysis.scores ?? {};
  const levels = analysis.levels ?? {};

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-3xl mx-auto">

        {/* Report Header */}
        <div className="border-b border-white/10 pb-8 mb-12 text-center">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Interview Evaluation Report
          </p>

          <p className="mt-4 font-mono text-lg tracking-widest">
            {session.publicId || sessionId}
          </p>

          <p className="mt-2 text-xs text-white/40">
            Save this ID to access your report later
          </p>
        </div>

        {/* Feedback Body */}
        <FeedbackUI
          insights={insights}
          scores={scores}
          levels={levels}
        />

      </div>
    </div>
  );
}
