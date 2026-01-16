import { useState, useCallback, useRef } from "react";

export const useSessionController = (totalQuestions) => {
  const [step, setStep] = useState("INTRO");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Holds raw audio blobs only (combined later)
  const audioChunksRef = useRef([]);

  const startSession = useCallback(() => {
    setStep("QUESTION");
  }, []);

  const onQuestionEnd = useCallback(() => {
    // Immediately go to recording (pressure-based)
    setStep("RECORDING");
  }, []);

  const onRecordingEnd = useCallback(
    (audioBlob) => {
      audioChunksRef.current.push(audioBlob);

      const nextIndex = currentQuestionIndex + 1;

      if (nextIndex < totalQuestions) {
        setCurrentQuestionIndex(nextIndex);
        setStep("QUESTION");
        return;
      }

      // Session finished → show post-session form
      setStep("POST_FORM");
    },
    [currentQuestionIndex, totalQuestions]
  );

  const getFinalAudioBlob = useCallback(() => {
    return new Blob(audioChunksRef.current, {
      type: "audio/webm",
    });
  }, []);

  const goToProcessing = useCallback(() => {
    setStep("PROCESSING");
  }, []);

  const goToResult = useCallback(() => {
    setStep("RESULT");
  }, []);

  return {
    step,
    currentQuestionIndex,
    actions: {
      startSession,
      onQuestionEnd,
      onRecordingEnd,
      getFinalAudioBlob,
      goToProcessing,
      goToResult,
    },
  };
};
