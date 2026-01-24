import { useEffect, useRef, useState } from "react";
import "./styles/Recorder.css";

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
    <div className="recorder">
      <div className="recorder-instruction">
        Speak clearly and continuously.
      </div>

   <div
  className={`recorder-timer ${
    recordingTime <= 5 ? "ending" : ""
  }`}
>
  <span className="rec-dot" />
  {recordingTime}s remaining
</div>

    </div>
  );
};

export default Recorder;
