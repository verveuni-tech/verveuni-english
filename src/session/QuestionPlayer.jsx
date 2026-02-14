import { useEffect, useRef } from "react";

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
    <div className="flex flex-col items-center space-y-6 text-center">

      <p className="text-white/60 text-sm uppercase tracking-wider">
        Listen carefully
      </p>

      <div className="flex items-center gap-3 text-blue-400 text-sm">
        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        Interviewer speaking...
      </div>

      <audio ref={audioRef} src={audioSrc} preload="auto" />

    </div>
  );
};

export default QuestionPlayer;
