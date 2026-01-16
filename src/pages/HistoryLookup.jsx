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
        setError("No interview found with this ID. Please check and try again.");
        setLoading(false);
        return;
      }

      // There should only be one match
      const doc = snap.docs[0];
      navigate(`/feedback/${doc.id}`);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">
          View Past Feedback
        </h1>
        <p className="text-slate-500 mb-6 text-sm">
          Enter your Interview ID to access your previous interview feedback.
        </p>

        <form onSubmit={handleSearch}>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Interview ID
          </label>

          <input
            type="text"
            placeholder="e.g. VU-7K9P2A"
            className="input input-bordered w-full font-mono tracking-wider"
            value={interviewId}
            onChange={(e) => setInterviewId(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-500 mt-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-6"
          >
            {loading ? "Searching…" : "View Feedback"}
          </button>
        </form>

        <div className="mt-6 text-xs text-slate-400 text-center">
          Your Interview ID was shown after completing your interview.
        </div>
      </div>
    </div>
  );
}
