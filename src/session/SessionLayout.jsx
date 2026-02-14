import { memo } from "react";
import { useNavigate } from "react-router-dom";

const SessionLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F1115] text-white flex flex-col">
      
      {/* Top Interview Header */}
      <div className="w-full border-b border-white/10 px-6 py-4 flex justify-between items-center">

        <div className="text-sm tracking-wide uppercase text-white/60">
          Interview Simulation
        </div>

        <div className="flex items-center gap-6 text-sm">

          <button
            onClick={() => navigate("/history")}
            className="text-white/40 hover:text-white/70 transition"
          >
            View Reports
          </button>

          <div className="text-white/40">
            VerveUni
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-2xl">
          {children}
        </div>
      </div>

    </div>
  );
};

export default memo(SessionLayout);
