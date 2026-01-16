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

      // ✅ SAVE FEEDBACK SNAPSHOT ONCE
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

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading feedback…</p>
      </div>
    );
  }

  // ✅ Always read from Firestore first
  const insights =
    session.interpretedFeedback ??
    interpretSession(session.analysis);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Interview ID */}
        <div className="mb-8 text-center bg-white rounded-xl shadow-sm p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Interview ID
          </p>
          <p className="mt-1 font-mono text-lg text-slate-800">
            {session.publicId}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Save this ID to access your feedback later
          </p>
        </div>

        <FeedbackUI insights={insights} />
      </div>
    </div>
  );
}
    