import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";

import SessionLayout from "../session/SessionLayout";
import { useSessionController } from "../session/useSessionController";

import IncomingCall from "../session/IncomingCall";
import CXDashboard from "../session/CXDashboard";
import Processing from "../session/Processing";
import PostSessionForm from "./PostSessionForm";
import PostSessionIntro from "../session/PostSessionIntro";

import { QUESTION_SETS } from "../session/questionBank";

const Session = () => {
  const navigate = useNavigate();

  const [selectedDay, setSelectedDay] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const QUESTIONS =
    selectedDay !== null ? QUESTION_SETS[selectedDay] : [];

  const { step, currentQuestionIndex, actions } =
    useSessionController(QUESTIONS.length);

  return (
    <SessionLayout>

      {/* ---------------------------------------------- */}
      {/* Day Selection Screen */}
      {/* ---------------------------------------------- */}
      {selectedDay === null && (
        <div className="flex flex-col items-center justify-center space-y-8 text-center">

          <h2 className="text-2xl font-semibold">
            Select Practice Day
          </h2>

          <p className="text-white/60 max-w-md">
            Choose a structured interview practice set.
            Complete one set per day.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            {QUESTION_SETS.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className="px-6 py-2 border border-white/20 rounded-md hover:bg-white/10 transition"
              >
                Day {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------- */}
      {/* Interview Flow (After Day Selected) */}
      {/* ---------------------------------------------- */}
      {selectedDay !== null && (
        <>
          {step === "INTRO" && (
            <IncomingCall onAccept={actions.startSession} />
          )}

          {(step === "QUESTION" || step === "RECORDING") && (
            <CXDashboard
              mode={step === "QUESTION" ? "LISTENING" : "SPEAKING"}
              audioSrc={QUESTIONS[currentQuestionIndex]}
              questionIndex={currentQuestionIndex}
              totalQuestions={QUESTIONS.length}
              onQuestionEnd={actions.onQuestionEnd}
              onRecordingEnd={actions.onRecordingEnd}
            />
          )}

          {step === "POST_INTRO" && (
            <PostSessionIntro
              onContinue={actions.goToPostForm}
            />
          )}

          {step === "POST_FORM" && (
            <PostSessionForm
              finalAudioBlob={actions.getFinalAudioBlob()}
              onSessionCreated={(newSessionId) => {
                setSessionId(newSessionId);
                actions.goToProcessing();
              }}
            />
          )}

          {step === "PROCESSING" && sessionId && (
            <Processing
              sessionId={sessionId}
              onComplete={() => {
                navigate(`/feedback/${sessionId}`);
              }}
            />
          )}
        </>
      )}

    </SessionLayout>
  );
};

export default memo(Session);
