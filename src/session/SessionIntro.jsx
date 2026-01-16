import { memo } from "react";

const SessionIntro = ({ onStart }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Interview speaking simulation
      </h2>

      <p className="text-gray-600 mb-6">
        You will hear a question, think briefly, and respond without pauses or retries.
      </p>

      <button
        onClick={onStart}
        className="btn bg-blue-600 hover:bg-blue-700 text-white"
      >
        Begin session
      </button>
    </div>
  );
};

export default memo(SessionIntro);
