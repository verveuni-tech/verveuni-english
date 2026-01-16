// src/utils/interviewId.js

/**
 * Generates a short, human-friendly Interview ID
 * Example: VU-7K9P2A
 */
export function generateInterviewId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no confusing chars
  let id = "VU-";

  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return id;
}
