import { useEffect, useRef } from "react";

const QuestionPlayer = ({
  audioSrc,
  onComplete,
  questionIndex,
  totalQuestions,
}) => {
  const audioRef = useRef(null);
  const didPlayRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    audio
      .play()
      .then(() => {
        if (!cancelled) {
          didPlayRef.current = true;
        }
      })
      .catch(() => {
        // Ignore autoplay / abort errors
      });

    audio.onended = () => {
      onComplete();
    };

    return () => {
      cancelled = true;

      // Only pause if playback actually started
      if (didPlayRef.current) {
        audio.pause();
        audio.currentTime = 0;
      }

      audio.onended = null;
    };
  }, [audioSrc, onComplete]);

  return (
    <div className="relative text-center">
      <div className="absolute top-0 right-0 text-sm text-gray-500">
        Question {questionIndex + 1} of {totalQuestions}
      </div>

      <h2 className="text-xl font-semibold mb-2">
        Listening to interviewer
      </h2>

      <p className="text-gray-600 mb-6">
        Please listen carefully. Do not speak yet.
      </p>

      <audio ref={audioRef} src={audioSrc} preload="auto" />
    </div>
  );
};

export default QuestionPlayer;
