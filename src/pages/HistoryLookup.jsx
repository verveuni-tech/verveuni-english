import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export default function HistoryLookup() {
  const navigate = useNavigate();

  const [interviewId, setInterviewId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    setError(null);

    if (!interviewId.trim()) {
      setError("Please enter your Interview ID.");
      return;
    }

    try {
      setLoading(true);

      const q = query(
        collection(db, "sessions"),
        where("publicId", "==", interviewId.trim().toUpperCase())
      );

      const snap = await getDocs(q);

      if (snap.empty) {
        setError(
          "No interview found with this ID. Please verify and try again."
        );
        setLoading(false);
        return;
      }

      const doc = snap.docs[0];
      navigate(`/feedback/${doc.id}`);
    } catch (err) {
      console.error(err);
      setError("Unable to retrieve interview. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-white/10 rounded-xl p-8 text-white">

        <div className="mb-10 text-center">
          <h1 className="text-xl font-semibold">
            Access Interview Report
          </h1>

          <p className="mt-3 text-sm text-white/60">
            Enter your Interview ID to retrieve your evaluation report.
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-6">

          <div>
            <label className="block text-sm text-white/60 mb-2">
              Interview ID
            </label>

            <input
              type="text"
              placeholder="e.g. VU-7K9P2A"
              className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 font-mono tracking-widest text-white placeholder-white/30 focus:outline-none focus:border-white/30"
              value={interviewId}
              onChange={(e) => setInterviewId(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-2 rounded-md font-medium hover:bg-white/90 transition"
          >
            {loading ? "Retrieving…" : "View Report"}
          </button>

        </form>

        <div className="mt-8 text-xs text-white/40 text-center">
          Your Interview ID was displayed after completing your session.
        </div>

      </div>
    </div>
  );
}
