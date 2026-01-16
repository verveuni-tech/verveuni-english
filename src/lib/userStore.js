import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function saveUserProfile({
  userId,
  name,
  email,
  age,
  experience,
}) {
  const ref = doc(db, "users", userId);

  await setDoc(
    ref,
    {
      userId,
      name,
      email,
      age,
      experience,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}
