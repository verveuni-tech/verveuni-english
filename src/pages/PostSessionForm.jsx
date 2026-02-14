import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../lib/Cloudinary";
import { saveSessionMetadata } from "../lib/sessionStore";
import { generateInterviewId } from "../utils/interviewId";
import CustomSelect from "../components/CustomSelect";

export default function PostSessionForm({ finalAudioBlob }) {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nervousness, setNervousness] = useState("");
  const [repeatIntent, setRepeatIntent] = useState("");
  const [realism, setRealism] = useState("");

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setError(null);

    if (!nervousness || !repeatIntent || !realism) {
      setError("Please complete all questions.");
      return;
    }

    let userId = localStorage.getItem("verve_user_id");
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem("verve_user_id", userId);
    }

    const sessionId = crypto.randomUUID();
    const publicId = generateInterviewId();

    try {
      setStatus("uploading");

      const upload = await uploadToCloudinary(
        finalAudioBlob,
        sessionId
      );

      setStatus("saving");

      await saveSessionMetadata({
        userId,
        sessionId,
        publicId,
        audioUrl: upload.url,
        duration: upload.duration,
        questionCount: 3,
        validation: {
          nervousness,
          repeatIntent,
          realism,
        },
      });

      setStatus("analyzing");

     const res = await fetch(
  `${API_URL}/analyze-session`,

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        }
      );

      if (!res.ok) throw new Error("Analysis failed");

      navigate(`/feedback/${sessionId}`);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md border border-white/10 rounded-xl p-8 space-y-6 text-white"
      >
        <h2 className="text-xl font-semibold">
          Submit for Evaluation
        </h2>

        <input
          type="email"
          required
          placeholder="Email address"
          className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white placeholder-white/40"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <CustomSelect
          label="How nervous did you feel?"
          options={[
            "Very nervous",
            "Slightly nervous",
            "Not nervous",
          ]}
          value={nervousness}
          onChange={setNervousness}
        />

        <CustomSelect
          label="Would you practice again tomorrow?"
          options={["Yes", "Maybe", "No"]}
          value={repeatIntent}
          onChange={setRepeatIntent}
        />

        <CustomSelect
          label="Did this feel realistic?"
          options={["Yes", "Somewhat", "No"]}
          value={realism}
          onChange={setRealism}
        />

        {status !== "idle" && (
          <p className="text-sm text-white/60">
            {status === "uploading" && "Uploading audio…"}
            {status === "saving" && "Saving session…"}
            {status === "analyzing" && "Analyzing responses…"}
          </p>
        )}

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <button
          disabled={status !== "idle"}
          className="w-full bg-white text-black py-2 rounded-md font-medium hover:bg-white/90 transition"
        >
          {status === "idle"
            ? "Generate Feedback"
            : "Processing..."}
        </button>
      </form>
    </div>
  );
}
