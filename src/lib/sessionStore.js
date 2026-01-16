import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "./firebase";

export const saveSessionMetadata = async ({
  userId,
  sessionId,
  publicId, // 👈 NEW
  audioUrl,
  questionCount,
  duration,
}) => {
  const sessionRef = doc(db, "sessions", sessionId);

  await setDoc(sessionRef, {
    sessionId,
    publicId, // 👈 NEW (user-facing Interview ID)
    userId,
    audioUrl,
    questionCount,
    duration,
    status: "uploaded",
    analysis: null,
    createdAt: serverTimestamp(),
  });
};
