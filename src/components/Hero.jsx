import { useNavigate } from "react-router-dom";
import { Mic, UserCheck, MessageSquare } from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-white">
      {/* RIGHT HALF POLKA DOT BACKGROUND */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 -z-10"
        style={{
          backgroundColor: "#ffffff",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.18'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center space-y-7">
            {/* Badge */}
            <span className="inline-flex w-fit rounded-full bg-slate-100 px-4 py-1 text-xs font-medium text-slate-600">
              Interview & Real-World Speaking Practice
            </span>

            {/* Heading */}
            <h1 className="font-poppins text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl xl:text-[3.5rem] whitespace-nowrap">
              Learn to{" "}
              <span className="text-blue-600">speak English</span>
            </h1>

            {/* Description */}
            <p className="max-w-xl text-base text-slate-600 sm:text-lg">
              VerveUni lets you practice speaking through realistic interview
              and customer-call simulations — so you learn to respond clearly
              when it actually matters.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {[
                "Voice-based practice",
                "Real interview scenarios",
                "No grammar or accent judgment",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-slate-100 px-4 py-1.5 text-sm text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => navigate("/session")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-lg"
              >
                <Mic size={18} />
                Start a Session
              </button>

              <button
                onClick={() => navigate("/about-us")}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:bg-slate-100"
              >
                How VerveUni Works
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex justify-center">
            {/* Card covers dots underneath */}
            <div
              className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-md
              transition-all duration-300 ease-out
              hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-700">
                  Interview Simulation
                </p>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  Live
                </span>
              </div>

              <div className="space-y-5">
                {/* Question */}
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-800">
                    Interviewer
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    “Tell me about a time you handled a difficult customer.”
                  </p>
                </div>

                {/* Speaking State */}
                <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                    <UserCheck size={18} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">
                      You are responding…
                    </p>

                    {/* Animated Progress */}
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-blue-100">
                      <div className="h-full w-2/3 rounded-full bg-blue-600 animate-progress" />
                    </div>
                  </div>
                </div>

                {/* Feedback */}
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <MessageSquare size={18} className="mt-0.5 text-blue-600" />
                  <p>
                    Feedback focuses on clarity, confidence, and flow — not
                    grammar or accent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress animation */}
      <style>
        {`
          @keyframes progress {
            0% { transform: translateX(-20%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(-20%); }
          }
          .animate-progress {
            animation: progress 3s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
}
