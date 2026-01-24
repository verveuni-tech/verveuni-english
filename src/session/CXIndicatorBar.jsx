import { memo, useEffect, useState } from "react";
import "./styles/CXIndicatorBar.css";

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
    <div className={`cx-header ${mode.toLowerCase()}`}>
      <div className="cx-header-left">
        <span className="cx-status-dot" />
        <span className="cx-status-text">
          {mode === "LISTENING"
            ? "Customer is speaking"
            : "You are speaking"}
        </span>
      </div>

      <div className="cx-header-right">
        <span className="cx-time">{minutes}:{seconds}</span>
        <span className="cx-separator">•</span>
        Question {questionIndex + 1} of {totalQuestions}
      </div>
    </div>
  );
};

export default memo(CXIndicatorBar);
