import { memo, useEffect, useState } from "react";

const CXIndicatorBar = ({ mode, questionIndex, totalQuestions }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((t) => t + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="w-full max-w-3xl flex justify-between items-center text-sm text-white/60 border-b border-white/10 pb-4">

      <div className="flex items-center gap-2 uppercase tracking-wider">
        <span
          className={`w-2 h-2 rounded-full ${
            mode === "LISTENING"
              ? questionIndex === 0
                ? "bg-white/40"
                : "bg-blue-400"
              : "bg-red-500 animate-pulse"
          }`}
        />

        {mode === "LISTENING"
          ? questionIndex === 0
            ? "Session Briefing"
            : "Interviewer Speaking"
          : "Your Response"}
      </div>

      <div className="flex items-center gap-3">
        <span>{minutes}:{seconds}</span>
        <span className="opacity-30">•</span>
        <span>
          Question {questionIndex} of {totalQuestions - 1}
        </span>
      </div>

    </div>
  );
};

export default memo(CXIndicatorBar);
