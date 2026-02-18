/**
 * Converts backend analysis output into
 * adaptive, metric-aware coaching feedback.
 *
 * Compatible with v3 scoring architecture.
 */

export function interpretSession(analysis) {
  if (!analysis) return [];

  const insights = [];

  const { scores = {}, extra = {}, raw_metrics = {} } = analysis;

  // ✅ v3-safe score mapping with fallback
  const continuityScore =
    scores.continuity ?? scores.fluency ?? 0;

  const vocalStabilityScore =
    scores.vocal_stability ?? scores.confidence ?? 0;

  const languageControlScore =
    scores.language_control ?? scores.english ?? 0;

  const finalScore = scores.final ?? 0;

  const englishRatio = extra.english_ratio ?? 0;
  const wordCount = extra.word_count ?? 0;

  const pauseCount = raw_metrics.pause_count ?? 0;
  const longestPause = raw_metrics.longest_pause ?? 0;
  const speakingRatio = raw_metrics.speaking_ratio ?? 0;

  // --------------------------------------------------
  // 1️⃣ Strength Card (Adaptive)
  // --------------------------------------------------

  if (continuityScore >= 80) {
    insights.push({
      id: "strength-continuity",
      title: "What You Did Well",
      interpretation:
        "You maintained strong speaking continuity with minimal disruption.",
      suggestion: null,
    });

  } else if (vocalStabilityScore >= 80) {
    insights.push({
      id: "strength-vocal",
      title: "What You Did Well",
      interpretation:
        "Your vocal delivery was steady and confident throughout the response.",
      suggestion: null,
    });

  } else if (languageControlScore >= 85) {
    insights.push({
      id: "strength-language",
      title: "What You Did Well",
      interpretation:
        "You maintained consistent English usage throughout your answer.",
      suggestion: null,
    });

  } else if (wordCount >= 60) {
    insights.push({
      id: "strength-depth",
      title: "What You Did Well",
      interpretation:
        "You provided sufficient depth and explanation in your response.",
      suggestion: null,
    });

  } else {
    insights.push({
      id: "strength-effort",
      title: "What You Did Well",
      interpretation:
        "You completed the full response and stayed engaged throughout the session.",
      suggestion: null,
    });
  }

  // --------------------------------------------------
  // 2️⃣ Area to Improve (Metric-Driven)
  // --------------------------------------------------

  if (longestPause > 6) {
    insights.push({
      id: "improve-long-freeze",
      title: "What Slowed You Down",
      interpretation: `You paused for ${longestPause.toFixed(
        1
      )} seconds, which significantly disrupted the flow.`,
      suggestion:
        "Work on thinking aloud instead of remaining silent during difficult moments.",
    });

  } else if (longestPause > 4) {
    insights.push({
      id: "improve-long-pause",
      title: "What Slowed You Down",
      interpretation: `A pause of ${longestPause.toFixed(
        1
      )} seconds slightly affected your rhythm.`,
      suggestion:
        "Maintain verbal continuity while organizing your next thought.",
    });

  } else if (pauseCount >= 6) {
    insights.push({
      id: "improve-frequency",
      title: "What Slowed You Down",
      interpretation:
        "Frequent short pauses reduced the natural momentum of your answer.",
      suggestion:
        "Practice connecting ideas smoothly without stopping between sentences.",
    });

  } else if (speakingRatio < 0.65) {
    insights.push({
      id: "improve-continuity",
      title: "What Slowed You Down",
      interpretation:
        "Your speaking time was limited relative to the total response window.",
      suggestion:
        "Aim to maintain steady speech throughout the entire answer.",
    });

  } else if (continuityScore < 70) {
    insights.push({
      id: "improve-structure",
      title: "What Slowed You Down",
      interpretation:
        "Your ideas were clear, but structuring them more tightly would improve clarity.",
      suggestion:
        "Try organizing responses using a clear beginning, middle, and conclusion.",
    });

  } else if (wordCount < 40) {
    insights.push({
      id: "improve-depth",
      title: "What Slowed You Down",
      interpretation:
        "Your response was relatively brief, which limited its overall impact.",
      suggestion:
        "Aim for 40–60 words to develop stronger explanations.",
    });

  } else {
    insights.push({
      id: "minor-refinement",
      title: "What Slowed You Down",
      interpretation:
        "Your delivery was stable overall with minor areas for refinement.",
      suggestion:
        "Focus on making your key message more concise and direct.",
    });
  }

  // --------------------------------------------------
  // 3️⃣ Next Session Focus (Dynamic)
  // --------------------------------------------------

  let nextFocusSuggestion = "";

  if (longestPause > 6) {
    nextFocusSuggestion =
      "Focus on reducing long silent pauses by continuing to speak while thinking.";

  } else if (pauseCount >= 6) {
    nextFocusSuggestion =
      "Focus on reducing frequent short pauses between ideas.";

  } else if (continuityScore < 65) {
    nextFocusSuggestion =
      "Focus on maintaining uninterrupted speech for the first 10 seconds.";

  } else if (wordCount < 50) {
    nextFocusSuggestion =
      "Focus on expanding your answer with one concrete example.";

  } else {
    nextFocusSuggestion =
      "Focus on refining structure while maintaining your current speaking rhythm.";
  }

  insights.push({
    id: "next-focus",
    title: "Next Session Focus",
    interpretation:
      "In your next attempt, concentrate on one improvement area rather than adjusting everything at once.",
    suggestion: nextFocusSuggestion,
  });

  return insights;
}
