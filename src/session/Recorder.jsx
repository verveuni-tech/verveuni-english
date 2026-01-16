import { useEffect, useRef, useState } from "react";

const Recorder = ({
  onComplete,
  questionIndex,
  totalQuestions,
}) => {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recordingTime, setRecordingTime] = useState(30);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        chunksRef.current = [];
        onComplete(blob);
      };
    });
  }, [onComplete]);

  useEffect(() => {
    if (recordingTime === 0) {
      mediaRecorderRef.current.stop();
      return;
    }
    const timer = setTimeout(
      () => setRecordingTime((t) => t - 1),
      1000
    );
    return () => clearTimeout(timer);
  }, [recordingTime]);

  return (
    <div className="relative text-center">
      <div className="absolute top-0 right-0 text-sm text-gray-500">
        Question {questionIndex + 1} of {totalQuestions}
      </div>

      <h2 className="text-xl font-semibold mb-2">
        Recording your answer
      </h2>

      <p className="text-gray-600 mb-4">
        Speak continuously. No pauses or retries.
      </p>

      <div className="flex justify-center items-center gap-2 text-sm">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        Time left: {recordingTime}s
      </div>
    </div>
  );
};

export default Recorder;
