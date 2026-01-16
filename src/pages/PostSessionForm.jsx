import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../lib/Cloudinary";
import { saveSessionMetadata } from "../lib/sessionStore";
import { saveUserProfile } from "../lib/userStore";
import { generateInterviewId } from "../utils/interviewId";

export default function PostSessionForm({ finalAudioBlob }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("");

  const [status, setStatus] = useState("idle"); // idle | uploading | saving | analyzing
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setError(null);

    // ✅ persistent anonymous user
    let userId = localStorage.getItem("verve_user_id");
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem("verve_user_id", userId);
    }

    const sessionId = crypto.randomUUID();
    const publicId = generateInterviewId();

    try {
      setStatus("uploading");

      const upload = await uploadToCloudinary(finalAudioBlob, sessionId);

      setStatus("saving");

      // ✅ save user profile (NEW collection)
      await saveUserProfile({
        userId,
        name,
        email,
        age,
        experience,
      });

      // ✅ save session metadata (backend-safe)
      await saveSessionMetadata({
        userId,
        sessionId,
        publicId,
        audioUrl: upload.url,
        duration: upload.duration,
        questionCount: 2,
      });

      setStatus("analyzing");

      const res = await fetch("http://127.0.0.1:8000/analyze-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      if (!res.ok) throw new Error("Analysis failed");

      navigate(`/feedback/${sessionId}`);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 sm:p-8"
      >
        <h2 className="text-2xl font-semibold text-slate-800 mb-1">
          Get Your Interview Feedback
        </h2>
        <p className="text-slate-500 mb-6">
          Enter your details to generate personalized insights.
        </p>

        <div className="grid gap-4">
          <input
            className="input input-bordered w-full"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input input-bordered w-full"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="How was your experience?"
            rows={3}
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>

        {status !== "idle" && (
          <p className="mt-4 text-sm text-slate-600">
            {status === "uploading" && "Uploading audio…"}
            {status === "saving" && "Saving your session…"}
            {status === "analyzing" && "Analyzing your responses…"}
          </p>
        )}

        {error && (
          <p className="text-sm text-red-500 mt-3">{error}</p>
        )}

        <button
          className="btn btn-primary w-full mt-6"
          disabled={status !== "idle"}
        >
          {status === "idle" ? "Generate Feedback" : "Processing…"}
        </button>
      </form>
    </div>
  );
}
