import { memo } from "react";

const SessionIntro = ({ onStart }) => {
  return (
    <div className="text-center space-y-8">
      
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-wider text-white/50">
          Incoming Interview
        </p>

        <h1 className="text-3xl font-semibold">
          Software Engineering Intern
        </h1>

        <p className="text-white/60 max-w-md mx-auto">
          You are about to begin a live interview simulation.
          Respond clearly and professionally in English.
        </p>
      </div>

      {/* Minimal Avatar Placeholder */}
      <div className="flex justify-center">
        <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center text-lg text-white/50">
          HR
        </div>
      </div>

      <button
        onClick={onStart}
        className="px-8 py-3 rounded-md bg-white text-black font-medium hover:bg-white/90 transition"
      >
        Begin Interview
      </button>
    </div>
  );
};

export default memo(SessionIntro);
