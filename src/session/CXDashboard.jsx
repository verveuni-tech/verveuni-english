import CXIndicatorBar from "./CXIndicatorBar";
import QuestionPlayer from "./QuestionPlayer";
import Recorder from "./Recorder";

const CXDashboard = ({
  mode,
  audioSrc,
  questionIndex,
  totalQuestions,
  onQuestionEnd,
  onRecordingEnd,
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 text-center">

      <CXIndicatorBar
        mode={mode}
        questionIndex={questionIndex}
        totalQuestions={totalQuestions}
      />

      <div className="w-full max-w-xl space-y-8">

        {mode === "LISTENING" && (
          <div className="space-y-6">

            <h2 className="text-xl text-white/80">
              {questionIndex === 0
                ? "Interview Briefing"
                : "Interview Question"}
            </h2>

            <QuestionPlayer
              audioSrc={audioSrc}
              onComplete={onQuestionEnd}
            />

            <p className="text-white/50 text-sm">
              {questionIndex === 0
                ? "Please listen carefully before the session begins."
                : "Listen carefully. You will respond immediately after."}
            </p>

          </div>
        )}

        {mode === "SPEAKING" && (
          <div className="space-y-6">

            

            <h2 className="text-xl text-white">
              Your Response
            </h2>

            <Recorder onComplete={onRecordingEnd} />

            <p className="text-white/50 text-sm">
              Speak clearly and confidently. There are no retries.
            </p>

          </div>
        )}

      </div>

    </div>
  );
};

export default CXDashboard;
