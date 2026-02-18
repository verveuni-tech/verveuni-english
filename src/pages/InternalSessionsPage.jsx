import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const SECRET = import.meta.env.VITE_INTERNAL_KEY;

export default function InternalSessionsPage() {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [publicId, setPublicId] = useState("");
  const [sessions, setSessions] = useState([]);
  const [allPublicIds, setAllPublicIds] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");

    if (key === SECRET) {
      setAuthorized(true);
      fetchAllPublicIds();
    }
  }, []);

  async function fetchAllPublicIds() {
    const snapshot = await getDocs(collection(db, "sessions"));
    const ids = snapshot.docs
      .map((doc) => doc.data().publicId)
      .filter(Boolean);

    const unique = [...new Set(ids)];
    setAllPublicIds(unique);
  }

  async function fetchSessionsByPublicId(id) {
    if (!id) return;

    setLoading(true);
    setPublicId(id);

    const q = query(
      collection(db, "sessions"),
      where("publicId", "==", id)
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => doc.data());

    setSessions(data);
    setLoading(false);
  }

  function handleBack() {
    setPublicId("");
    setSessions([]);
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Unauthorized
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-10 py-16">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-semibold tracking-tight mb-10">
          Analysis Metrics (Internal)
        </h1>

        {/* Search Bar */}
        <div className="mb-10 flex gap-4">
          <input
            placeholder="Search Public ID"
            value={publicId}
            onChange={(e) => setPublicId(e.target.value)}
            className="bg-white/5 backdrop-blur-lg border border-white/10 px-4 py-3 rounded-xl outline-none w-72"
          />
          <button
            onClick={() => fetchSessionsByPublicId(publicId)}
            className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Fetch
          </button>
        </div>

        {/* Default Public ID List */}
        {!publicId && sessions.length === 0 && (
          <div className="mb-14">
            <div className="text-sm text-gray-400 mb-4 uppercase tracking-wider">
              Available Interview Public IDs
            </div>

            <div className="grid grid-cols-3 gap-4">
              {allPublicIds.map((id) => (
                <button
                  key={id}
                  onClick={() => fetchSessionsByPublicId(id)}
                  className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-left hover:bg-white/10 transition"
                >
                  <div className="font-medium">{id}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    View analysis metrics
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && <div>Loading...</div>}

        {/* Back Button */}
        {sessions.length > 0 && (
          <div className="mb-8">
            <button
              onClick={handleBack}
              className="text-sm text-gray-400 hover:text-white transition"
            >
              ← Back to Interview List
            </button>
          </div>
        )}

        {/* Analysis Display */}
        {sessions.map((session, index) => {
          const analysis = session.analysis || {};
          const raw = analysis.raw_metrics || {};
          const scores = analysis.scores || {};
          const levels = analysis.levels || {};
          const extra = analysis.extra || {};

          return (
            <div key={index} className="space-y-12">

              <div className="grid grid-cols-2 gap-10">

                {/* RAW METRICS */}
                <Card title="Raw Metrics">

                  <Section title="Time Metrics">
                    <MetricBig
                      label="Speaking Ratio"
                      value={`${((raw.speaking_ratio ?? 0) * 100).toFixed(1)}%`}
                      helper="Portion of total response spent speaking"
                    />
                    <Metric label="Speaking Time" value={`${raw.speaking_time?.toFixed(2)} sec`} />
                    <Metric label="Total Duration" value={`${raw.total_duration?.toFixed(2)} sec`} />
                    <Metric label="Total Silence" value={`${raw.silence_time?.toFixed(2)} sec`} />
                  </Section>

                  <Section title="Pause Metrics">
                    <MetricBig
                      label="Pause Count"
                      value={`${raw.pause_count ?? 0}`}
                      helper="Number of detected silence segments"
                    />
                    <Metric label="Longest Pause" value={`${raw.longest_pause?.toFixed(2)} sec`} />
                    <Metric label="Average Pause" value={`${raw.average_pause?.toFixed(2)} sec`} />
                  </Section>

                  <Section title="Energy & Delivery">
                    <Metric label="Tempo Proxy" value={raw.tempo_proxy?.toFixed(4)} />
                    <Metric label="Average Energy" value={raw.average_energy?.toFixed(4)} />
                    <Metric label="Energy Variance" value={raw.energy_variance?.toFixed(4)} />
                  </Section>

                </Card>

                {/* SCORES & LEVELS */}
                <Card title="Scoring & Interpretation">

                  <Section title="Scores">
                    <MetricBig
                      label="Final Score"
                      value={scores.final?.toFixed(1)}
                      helper="Weighted performance score"
                    />
                    <Metric label="Continuity" value={scores.continuity} />
                    <Metric label="Language Control" value={scores.language_control} />
                    <Metric label="Structure" value={scores.structure} />
                    <Metric label="Vocal Stability" value={scores.vocal_stability} />
                  </Section>

                  <Section title="Levels">
                    <Metric label="Final Level" value={levels.final_level} />
                    <Metric label="Continuity Level" value={levels.continuity_level} />
                    <Metric label="Structure Level" value={levels.structure_level} />
                    <Metric label="Language Level" value={levels.language_control_level} />
                    <Metric label="Vocal Stability Level" value={levels.vocal_stability_level} />
                  </Section>

                  <Section title="Language & Content">
                    <Metric label="English Ratio" value={`${((extra.english_ratio ?? 0) * 100).toFixed(1)}%`} />
                    <Metric label="Word Count" value={extra.word_count} />
                    <Metric label="Language" value={extra.language} />
                    <Metric label="Analysis Version" value={analysis.analysis_version} />
                  </Section>

                </Card>

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}

/* ---------- UI COMPONENTS ---------- */

function Card({ title, children }) {
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/3 
                    backdrop-blur-xl 
                    border border-white/10 
                    rounded-2xl 
                    p-8 
                    shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      <h2 className="text-xl font-semibold mb-8 tracking-tight">
        {title}
      </h2>
      <div className="space-y-10">
        {children}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-gray-500 mb-4">
        {title}
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function MetricBig({ label, value, helper }) {
  return (
    <div className="pb-6 border-b border-white/10">
      <div className="text-sm text-gray-400">{label}</div>
      <div className="text-3xl font-semibold tracking-tight mt-1">
        {value ?? "-"}
      </div>
      {helper && (
        <div className="text-xs text-gray-500 mt-1">
          {helper}
        </div>
      )}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="flex justify-between items-center text-sm py-1">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium text-white">
        {value ?? "-"}
      </span>
    </div>
  );
}
