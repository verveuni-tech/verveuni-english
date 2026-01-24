import { memo } from "react";

const SessionIntro = ({ onStart }) => {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-10 text-center">
      <h1 className="text-2xl font-semibold mb-4">
        Incoming customer call
      </h1>

      <p className="text-slate-600 mb-8">
        You are about to receive a simulated customer support call.
        Respond clearly and professionally in English.
      </p>

      <div className="flex justify-center mb-8">
        <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold animate-pulse">
          M
        </div>
      </div>

      <button
        onClick={onStart}
        className="px-8 py-3 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition"
      >
        Accept Call
      </button>
    </div>
  );
};

export default memo(SessionIntro);
