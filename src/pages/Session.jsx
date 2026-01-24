import { memo, useState } from "react";
import SessionLayout from "../session/SessionLayout";
import { useSessionController } from "../session/useSessionController";

import IncomingCall from "../session/IncomingCall";
import CXDashboard from "../session/CXDashboard";
import Processing from "../session/Processing";
import Result from "../session/Result";
import PostSessionForm from "./PostSessionForm";
import PostSessionIntro from "../session/PostSessionIntro";


const QUESTIONS = [
  "/audio/interview-q1.mp3",
  "/audio/interview-q5.mp3",
];

const Session = () => {
  const { step, currentQuestionIndex, actions } =
    useSessionController(QUESTIONS.length);

  const [analysis, setAnalysis] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  return (
    <SessionLayout>
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
          onComplete={(analysisData) => {
            setAnalysis(analysisData);
            actions.goToResult();
          }}
        />
      )}

      {step === "RESULT" && <Result analysis={analysis} />}
    </SessionLayout>
  );
};

export default memo(Session);
