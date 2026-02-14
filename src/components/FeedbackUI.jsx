import { memo } from "react";

function FeedbackUI({ insights = [], scores, levels }) {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-3xl">

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
        {/* Score Summary */}
        {/* -------------------------------- */}
        {scores && (
          <div className="grid grid-cols-3 gap-6 mb-16 text-center border-y border-white/10 py-6">
            <ScoreMetric
              label="Fluency"
              value={scores.fluency}
              level={levels?.fluency_level}
            />
            <ScoreMetric
              label="English Usage"
              value={scores.english}
              level={levels?.english_level}
            />
            <ScoreMetric
              label="Overall"
              value={scores.final}
              level={levels?.final_level}
            />
          </div>
        )}

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

function ScoreMetric({ label, value, level }) {
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
