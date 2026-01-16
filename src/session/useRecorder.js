import { useRef, useState } from "react";

export const useRecorder = () => {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);

  const start = async () => {
    streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorderRef.current = new MediaRecorder(streamRef.current);
    chunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = e => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stop = () =>
    new Promise(resolve => {
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        streamRef.current.getTracks().forEach(t => t.stop());
        setIsRecording(false);
        resolve(blob);
      };
      mediaRecorderRef.current.stop();
    });

  return { start, stop, isRecording };
};
