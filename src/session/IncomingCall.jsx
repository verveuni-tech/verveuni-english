import { memo } from "react";

const IncomingCall = ({ onAccept }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-10">

      {/* Status */}
      <div className="flex items-center gap-2 text-sm uppercase tracking-wider text-white/50">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        Incoming Interview
      </div>

      {/* Interviewer Block */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center text-white/60 text-lg">
          HR
        </div>

        <p className="text-white/40 text-sm">
          Interviewer is waiting…
        </p>
      </div>

      {/* Title */}
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold">
          Just a basic Interview
        </h1>

        <p className="text-white/60 max-w-md mx-auto">
          You are about to begin a live interview simulation.
         There is no correct answer, just respond clearly and professionally in English.
         Focus on speaking naturally and confidently.
         The system will analyze your speaking patterns and provide feedback after the interview.
         Good luck!
         
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={onAccept}
        className="px-8 py-3 bg-white text-black rounded-md font-medium hover:bg-white/90 transition"
      >
        Begin Interview
      </button>

    </div>
  );
};

export default memo(IncomingCall);
