/**
 * Converts backend analysis output into
 * psychologically safe, coaching-style feedback.
 *
 * Focus: clarity, confidence, repeat usage.
 */
export function interpretSession(analysis) {
  if (!analysis) return [];

  const insights = [];

  const { scores, extra } = analysis;

  const fluencyScore = scores?.fluency ?? 0;
  const englishRatio = extra?.english_ratio ?? 0;
  const wordCount = extra?.word_count ?? 0;

  // ----------------------------------------
  // 1️⃣ Strength Card
  // ----------------------------------------

  if (fluencyScore >= 75) {
    insights.push({
      id: "strength-fluency",
      title: "What You Did Well",
      interpretation:
        "You maintained a steady speaking flow with minimal hesitation.",
      suggestion: null,
    });
  } else if (englishRatio >= 0.75) {
    insights.push({
      id: "strength-english",
      title: "What You Did Well",
      interpretation:
        "You stayed consistent in English throughout your response.",
      suggestion: null,
    });
  } else {
    insights.push({
      id: "strength-effort",
      title: "What You Did Well",
      interpretation:
        "You attempted the full response and stayed engaged throughout the session.",
      suggestion: null,
    });
  }

  // ----------------------------------------
  // 2️⃣ Area to Improve
  // ----------------------------------------

  if (fluencyScore < 50) {
    insights.push({
      id: "improve-hesitation",
      title: "What Slowed You Down",
      interpretation:
        "Frequent pauses may have made your response harder to follow.",
      suggestion:
        "Try speaking continuously for at least 8–10 seconds before slowing down.",
    });
  } else if (fluencyScore < 75) {
    insights.push({
      id: "improve-flow",
      title: "What Slowed You Down",
      interpretation:
        "Some hesitation interrupted the natural flow of your answer.",
      suggestion:
        "Practice beginning your answer immediately without overthinking the first sentence.",
    });
  } else if (englishRatio < 0.75) {
    insights.push({
      id: "improve-language",
      title: "What Slowed You Down",
      interpretation:
        "Switching languages reduced clarity during your response.",
      suggestion:
        "Try completing full thoughts in English before switching languages.",
    });
  } else if (wordCount < 40) {
    insights.push({
      id: "improve-length",
      title: "What Slowed You Down",
      interpretation:
        "Your response was short, which limits depth and clarity.",
      suggestion:
        "Aim for 40–60 words to provide more complete answers.",
    });
  } else {
    insights.push({
      id: "improve-structure",
      title: "What Slowed You Down",
      interpretation:
        "Your response could be clearer with a more defined beginning and conclusion.",
      suggestion:
        "Try structuring answers with a clear introduction and closing sentence.",
    });
  }

  // ----------------------------------------
  // 3️⃣ Next Session Focus
  // ----------------------------------------

  insights.push({
    id: "next-focus",
    title: "Next Session Focus",
    interpretation:
      "In your next attempt, concentrate on one improvement area rather than trying to fix everything at once.",
    suggestion:
      "Start speaking immediately and maintain flow for the first 10 seconds before refining structure.",
  });

  return insights;
}
