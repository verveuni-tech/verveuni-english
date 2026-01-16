import { memo } from "react";

const How = () => {
  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20">
      {/* SECTION HEADER */}
      <div className="max-w-2xl mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
          How this simulation  <span className="block text-blue-600">Works.</span>
        </h2>
        <p className="text-gray-600 text-lg">
          A controlled, pressure-based speaking environment designed to
          observe delivery — not language accuracy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* LEFT: PROCESS */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 p-6 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">
              Structured interview flow
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              You listen to a pre-recorded interviewer, receive a short thinking
              window, and then respond without pauses, retries, or re-recording.
              Each response is captured as a single uninterrupted session.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">
              What is measured
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              The system focuses on measurable speaking behavior such as silence,
              pauses, response timing, and continuity under pressure.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 bg-blue-50">
            <h3 className="font-semibold text-gray-900 mb-2">
              What is intentionally excluded
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Grammar, pronunciation, accent, word choice, and AI-based language
              scoring are deliberately not part of this simulation.
            </p>
          </div>
        </div>

        {/* RIGHT: WHO IT’S FOR */}
        <div className="rounded-2xl border border-gray-200 p-8 bg-white">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Who this is designed for
          </h3>

          <ul className="space-y-4 text-gray-700 text-sm">
            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">●</span>
              Learners preparing for interviews who want to experience realistic
              speaking pressure.
            </li>

            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">●</span>
              Individuals who hesitate, freeze, or struggle with silence when
              answering questions verbally.
            </li>

            <li className="flex gap-3">
              <span className="text-blue-600 mt-1">●</span>
              People seeking feedback on delivery, confidence, and response
              behavior rather than language correctness.
            </li>
          </ul>

          <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-500">
            This simulation is not intended for grammar correction,
            pronunciation scoring, or AI-based language evaluation.
          </div>
        </div>

      </div>
    </section>
  );
};

export default memo(How);
