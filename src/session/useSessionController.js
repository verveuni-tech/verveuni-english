import { useState, useCallback, useRef } from "react";

export const useSessionController = (totalQuestions) => {
  const [step, setStep] = useState("INTRO");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Holds raw audio blobs
  const audioChunksRef = useRef([]);

  const startSession = useCallback(() => {
    // Reset state for safety
    audioChunksRef.current = [];
    setCurrentQuestionIndex(0);
    setStep("QUESTION");
  }, []);

const onQuestionEnd = useCallback(() => {
  // If intro just finished, skip recording
  if (currentQuestionIndex === 0) {
    setCurrentQuestionIndex(1);
    setStep("QUESTION");
    return;
  }

  // Otherwise normal flow
  setStep("RECORDING");
}, [currentQuestionIndex]);


  const onRecordingEnd = useCallback(
    (audioBlob) => {
      audioChunksRef.current.push(audioBlob);

      const nextIndex = currentQuestionIndex + 1;

      if (nextIndex < totalQuestions) {
        setCurrentQuestionIndex(nextIndex);
        setStep("QUESTION");
        return;
      }

      // ✅ Session finished → show post-session intro
      setStep("POST_INTRO");
    },
    [currentQuestionIndex, totalQuestions]
  );

  const getFinalAudioBlob = useCallback(() => {
    return new Blob(audioChunksRef.current, {
      type: "audio/webm",
    });
  }, []);

  const goToPostForm = useCallback(() => {
    setStep("POST_FORM");
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
      goToPostForm,
      goToProcessing,
      goToResult,
    },
  };
};
