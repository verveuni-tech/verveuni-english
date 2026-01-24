import { useEffect, useRef } from "react";
import "./styles/QuestionPlayer.css";

const QuestionPlayer = ({ audioSrc, onComplete }) => {
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
      .catch(() => {});

    audio.onended = () => {
      onComplete();
    };

    return () => {
      cancelled = true;

      if (didPlayRef.current) {
        audio.pause();
        audio.currentTime = 0;
      }

      audio.onended = null;
    };
  }, [audioSrc, onComplete]);

  return (
    <div className="question-player">
      <p className="instruction">
        Please listen carefully.
        Do not speak yet.
      </p>

      <audio ref={audioRef} src={audioSrc} preload="auto" />
    </div>
  );
};

export default QuestionPlayer;
