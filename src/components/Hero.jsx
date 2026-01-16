import { HiOutlineMicrophone, HiOutlineChartBar } from "react-icons/hi";
import { BsCameraVideo } from "react-icons/bs";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <div>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1 text-xs sm:text-sm font-medium text-blue-600">
              AI Interview Simulation
            </span>

            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-slate-900">
              Practice Interviews.
              <span className="block text-blue-600">
                Improve with AI Feedback.
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg text-slate-600">
              Simulate real interview questions, speak naturally, and receive
              structured feedback on clarity, confidence, and pacing.
            </p>

            {/* CTA */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="rounded-xl bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition">
                Start Free Simulation
              </button>

              <button className="rounded-xl border border-slate-200 px-6 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 transition">
                See How It Works
              </button>
            </div>

            {/* TRUST INDICATORS */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <HiOutlineMicrophone className="text-blue-600" />
                Voice-based
              </div>
              <div className="flex items-center gap-2">
                <BsCameraVideo className="text-blue-600" />
                Real questions
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineChartBar className="text-blue-600" />
                Actionable insights
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6 shadow-sm">
              
              {/* HEADER */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Interview Session
                  </p>
                  <p className="text-xs text-slate-500">
                    Behavioral Round
                  </p>
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                  Live
                </span>
              </div>

              {/* QUESTION */}
              <div className="mt-4 rounded-xl bg-white p-3 sm:p-4 border border-slate-200">
                <p className="text-xs text-slate-500">Question</p>
                <p className="mt-1 text-sm sm:text-base font-medium text-slate-800">
                  Tell me about a challenge you faced and how you handled it.
                </p>
              </div>

              {/* FEEDBACK — MOBILE SAFE */}
              <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { label: "Clarity", value: "82%" },
                  { label: "Confidence", value: "76%" },
                  { label: "Pacing", value: "88%" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl bg-white p-2 sm:p-3 border border-slate-200 text-center"
                  >
                    <p className="text-[11px] sm:text-xs text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-0.5 sm:mt-1 text-base sm:text-lg font-semibold text-blue-600">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SUBTLE ACCENT (HIDDEN ON MOBILE) */}
            <div className="hidden sm:block absolute -z-10 -top-8 -right-8 h-40 w-40 rounded-full bg-blue-100 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
