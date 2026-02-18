import { memo } from "react";

function FeedbackUI({ insights = [], scores = {}, levels = {} }) {
  // ✅ Backward-compatible mapping
  const continuity =
    scores.continuity ?? scores.fluency ?? 0;

  const vocalStability =
    scores.vocal_stability ?? scores.confidence ?? 0;

  const languageControl =
    scores.language_control ?? scores.english ?? 0;

  const structure =
    scores.structure ?? 0;

  const finalScore = scores.final ?? 0;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-4xl">

        {/* -------------------------------- */}
        {/* Header */}
        {/* -------------------------------- */}
        <div className="text-center mb-14">
          <h1 className="text-2xl font-semibold">
            Interview Evaluation Report
          </h1>

          <p className="mt-3 text-white/60 text-sm">
            Analysis based on your speaking behavior during this session.
          </p>
        </div>

        {/* -------------------------------- */}
        {/* Score Summary (v3 Architecture) */}
        {/* -------------------------------- */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16 text-center border-y border-white/10 py-6">

          <ScoreMetric
            label="Continuity"
            value={continuity}
            level={levels?.continuity_level}
          />

          <ScoreMetric
            label="Vocal Stability"
            value={vocalStability}
            level={levels?.vocal_stability_level}
          />

          <ScoreMetric
            label="Language Control"
            value={languageControl}
            level={levels?.language_control_level}
          />

          <ScoreMetric
            label="Structure"
            value={structure}
            level={levels?.structure_level}
          />

          <ScoreMetric
            label="Overall"
            value={finalScore}
            level={levels?.final_level}
          />
        </div>

        {/* -------------------------------- */}
        {/* Feedback Sections */}
        {/* -------------------------------- */}
        <div className="space-y-10">
          {insights.map((item) => (
            <div
              key={item.id}
              className="border border-white/10 rounded-lg p-6"
            >
              <h3 className="text-lg font-medium">
                {item.title}
              </h3>

              <p className="mt-4 text-white/70 leading-relaxed text-sm">
                {item.interpretation}
              </p>

              {item.evidence && (
                <div className="mt-5 text-xs text-white/50">
                  Observed: {item.evidence}
                </div>
              )}

              {item.suggestion && (
                <div className="mt-6 border-l-2 border-white/30 pl-4">
                  <p className="text-sm text-white/80">
                    {item.suggestion}
                  </p>
                </div>
              )}
            </div>
          ))}

          {insights.length === 0 && (
            <p className="text-center text-white/50 text-sm">
              No strong speaking patterns were detected in this session.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

/* -------------------------------- */
/* Score Metric Component */
/* -------------------------------- */

function ScoreMetric({ label, value = 0, level }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-white/40">
        {label}
      </p>

      <p className="mt-2 text-xl font-semibold">
        {Math.round(value)}
      </p>

      {level && (
        <p className="mt-1 text-xs text-white/50 capitalize">
          {level}
        </p>
      )}
    </div>
  );
}

export default memo(FeedbackUI);
