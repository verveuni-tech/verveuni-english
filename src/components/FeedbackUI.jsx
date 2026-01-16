import { memo } from "react";

function FeedbackUI({ insights = [] }) {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold text-slate-900 text-center">
          Your Speaking Feedback
        </h1>

        <p className="mt-2 text-center text-slate-600">
          Based on how you spoke during this session
        </p>

        <div className="mt-10 space-y-6">
          {insights.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-3 text-slate-700 leading-relaxed">
                {item.interpretation}
              </p>

              <div className="mt-4 rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-600">
                <span className="font-medium">What we noticed:</span>{" "}
                {item.evidence}
              </div>

              <div className="mt-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 px-4 py-3">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">Suggestion:</span>{" "}
                  {item.suggestion}
                </p>
              </div>
            </div>
          ))}

          {insights.length === 0 && (
            <p className="text-center text-slate-500">
              We didn’t detect any strong speaking patterns in this session.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(FeedbackUI);
