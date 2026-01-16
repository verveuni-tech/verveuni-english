export function interpretSession(analysis) {
  if (!analysis) return [];

  const insights = [];

  const m = analysis.raw_metrics || {};
  const s = analysis.scores || {};
  const g = analysis.signals || {};

  // 1️⃣ Pausing / Silence
  if (m.silence_time > 15) {
    insights.push({
      id: "pauses",
      title: "Frequent Pauses",
      interpretation:
        "You paused several times while responding, which often indicates hesitation or reflective thinking under pressure.",
      evidence: `You were silent for about ${Math.round(
        m.silence_time
      )} seconds during the session.`,
      suggestion:
        "Try answering continuously for the first 10 seconds before refining your response."
    });
  }

  // 2️⃣ Engagement
  if (m.speaking_ratio >= 0.6) {
    insights.push({
      id: "engagement",
      title: "Sustained Engagement",
      interpretation:
        "You stayed engaged with the question and continued speaking rather than withdrawing into silence.",
      evidence: `You spent roughly ${Math.round(
        m.speaking_ratio * 100
      )}% of the time speaking.`,
      suggestion:
        "Maintain this engagement while practicing smoother transitions between ideas."
    });
  }

  // 3️⃣ Confidence
  if (g.confidence_level === "medium") {
    insights.push({
      id: "confidence",
      title: "Moderate Confidence",
      interpretation:
        "Your speaking pattern shows moderate confidence, which is common when ideas are still forming aloud.",
      evidence: `Confidence score observed: ${s.confidence_score}.`,
      suggestion:
        "Use a simple opening–body–closing structure to improve confidence consistency."
    });
  }

  return insights;
}
