import { memo, useState } from "react";
import SessionLayout from "../session/SessionLayout";
import { useSessionController } from "../session/useSessionController";

import SessionIntro from "../session/SessionIntro";
import QuestionPlayer from "../session/QuestionPlayer";
import Recorder from "../session/Recorder";
import Processing from "../session/Processing";
import Result from "../session/Result";
import PostSessionForm from "./PostSessionForm";

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
        <SessionIntro onStart={actions.startSession} />
      )}

      {step === "QUESTION" && (
        <QuestionPlayer
          audioSrc={QUESTIONS[currentQuestionIndex]}
          questionIndex={currentQuestionIndex}
          totalQuestions={QUESTIONS.length}
          onComplete={actions.onQuestionEnd}
        />
      )}

      {step === "RECORDING" && (
        <Recorder
          questionIndex={currentQuestionIndex}
          totalQuestions={QUESTIONS.length}
          onComplete={actions.onRecordingEnd}
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
