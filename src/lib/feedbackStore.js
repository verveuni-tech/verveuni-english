import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function saveInterpretedFeedback(sessionId, insights) {
  const ref = doc(db, "sessions", sessionId);

  await updateDoc(ref, {
    interpretedFeedback: insights,
    feedbackVersion: "v1",
    feedbackSavedAt: serverTimestamp(),
  });
}
