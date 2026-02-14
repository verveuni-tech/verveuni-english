import { memo } from "react";

const PostSessionIntro = ({ onContinue }) => {
  return (
    <div className="text-center space-y-6">

      <h2 className="text-2xl font-semibold">
        Interview Completed
      </h2>

      <p className="text-white/60 max-w-md mx-auto">
        Your responses have been recorded.
        Complete the short form below and we’ll analyze your interview performance.
      </p>

      <button
        onClick={onContinue}
        className="px-6 py-3 bg-white text-black rounded-md font-medium hover:bg-white/90 transition"
      >
        Continue
      </button>

    </div>
  );
};

export default memo(PostSessionIntro);
