import { useEffect, useRef, useState } from "react";

const Recorder = ({ onComplete }) => {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recordingTime, setRecordingTime] = useState(30);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.start();

      recorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: "audio/webm",
        });
        chunksRef.current = [];
        onComplete(blob);
      };
    });
  }, [onComplete]);

  useEffect(() => {
    if (recordingTime === 0) {
      mediaRecorderRef.current?.stop();
      return;
    }

    const timer = setTimeout(
      () => setRecordingTime((t) => t - 1),
      1000
    );

    return () => clearTimeout(timer);
  }, [recordingTime]);

  return (
    <div className="flex flex-col items-center space-y-6 text-center">

      {/* Recording Indicator */}
      <div className="flex items-center gap-3 text-red-500 uppercase tracking-wider text-sm">
        <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        Recording
      </div>

      {/* Timer */}
      <div className="text-2xl font-semibold text-white">
        {recordingTime}s
      </div>

      <p className="text-white/50 text-sm max-w-sm">
        Respond naturally. Focus on clarity and confidence.
      </p>

    </div>
  );
};

export default Recorder;
