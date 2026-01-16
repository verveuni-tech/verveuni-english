import { memo } from "react";

const FeedbackOutput = () => {
  return (
    <section id="output" className="max-w-7xl mx-auto px-6 py-14 bg-white">
      {/* SECTION HEADER */}
      <div className="max-w-3xl mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
          What you’ll{" "}
          <span className="text-blue-600">receive</span>{" "}
          after the session
        </h2>

        <p className="text-gray-600">
          A clear, behavior-focused summary of how you spoke under pressure —
          designed to support reflection, not judgment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* LEFT: METRIC SUMMARY */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-6">
          <h3 className="font-semibold text-gray-900 mb-5">
            Session behavior summary
          </h3>

          <div className="space-y-3 text-sm">
            <MetricRow label="Total speaking time" />
            <MetricRow label="Total silence duration" />
            <MetricRow label="Number of pauses" />
            <MetricRow label="Longest pause" />
            <MetricRow label="Average speech energy" />
          </div>

          <div className="mt-6 pt-4 border-t border-blue-100 text-xs text-gray-500">
            Metrics are extracted directly from your session audio using
            signal-level analysis (Python + Librosa).
          </div>
        </div>

        {/* RIGHT: INTERPRETATION */}
        <div className="space-y-4">

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
            <h4 className="font-semibold text-gray-900 mb-1">
              Behavioral interpretation
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              Raw metrics are interpreted using transparent, rule-based logic to
              surface patterns such as hesitation, delayed responses, or
              extended silence under pressure.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h4 className="font-semibold text-gray-900 mb-1">
              Reflective feedback, not scores
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Feedback is presented as observations and suggestions — never as
              grades, rankings, or confidence scores.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h4 className="font-semibold text-gray-900 mb-1">
              Actionable next steps
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              You may receive guidance such as reducing initial silence,
              improving response continuity, or practicing time-bound thinking
              before speaking.
            </p>
          </div>

        </div>
      </div>

      {/* CLOSING NOTE */}
      
    </section>
  );
};

export default memo(FeedbackOutput);

/* ---------------- SUBCOMPONENT ---------------- */

function MetricRow({ label }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700">{label}</span>
      <span className="text-xs font-semibold text-blue-600">
        Measured
      </span>
    </div>
  );
}
