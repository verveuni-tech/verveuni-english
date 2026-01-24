/**
 * Converts backend analysis output into
 * human-readable feedback cards.
 *
 * This file is the ONLY place where meaning,
 * judgment, and explanation logic lives.
 */
export function interpretSession(analysis) {
  if (!analysis) return [];

  const insights = [];

  const { scores, raw_metrics, extra } = analysis;

  const fluencyScore = scores?.fluency ?? 0;
  const englishScore = scores?.english ?? 0;
  const finalScore = scores?.final ?? 0;

  const englishRatio = extra?.english_ratio ?? 0;
  const wordCount = extra?.word_count ?? 0;
  const language = extra?.language ?? "unknown";

  // ---------------------------------------------------
  // 1. Fluency Interpretation (AUDIO-BASED)
  // ---------------------------------------------------
  if (fluencyScore >= 75) {
    insights.push({
      id: "fluency-strong",
      title: "Strong Speaking Fluency",
      interpretation:
        "You were able to speak smoothly with minimal hesitation, which helps the listener stay engaged.",
      evidence: `Fluency score: ${fluencyScore}`,
      suggestion:
        "Maintain this flow while focusing on structuring answers with a clear start and finish.",
    });
  } else if (fluencyScore >= 50) {
    insights.push({
      id: "fluency-moderate",
      title: "Moderate Speaking Fluency",
      interpretation:
        "You were able to continue speaking, but some pauses may have disrupted clarity.",
      evidence: `Fluency score: ${fluencyScore}`,
      suggestion:
        "Practice answering questions out loud without stopping for the first 10 seconds.",
    });
  } else {
    insights.push({
      id: "fluency-low",
      title: "Frequent Hesitation",
      interpretation:
        "Your response included frequent pauses, which can make answers harder to follow.",
      evidence: `Fluency score: ${fluencyScore}`,
      suggestion:
        "Try rehearsing short answers and gradually increasing length while staying continuous.",
    });
  }

  // ---------------------------------------------------
  // 2. English Usage / Validity Interpretation
  // ---------------------------------------------------
  if (englishRatio < 0.5) {
    insights.push({
      id: "english-very-low",
      title: "Limited English Usage",
      interpretation:
        "A large portion of your response was not in English, which affects how well it can be evaluated.",
      evidence: `English usage: ${Math.round(englishRatio * 100)}%`,
      suggestion:
        "Try to stay in English throughout your response, even if it feels slower at first.",
    });
  } else if (englishRatio < 0.75) {
    insights.push({
      id: "english-mixed",
      title: "Mixed Language Usage",
      interpretation:
        "Your response included both English and another language, which reduced clarity.",
      evidence: `English usage: ${Math.round(englishRatio * 100)}%`,
      suggestion:
        "Aim to complete full thoughts in English before switching languages.",
    });
  } else {
    insights.push({
      id: "english-strong",
      title: "Clear English Communication",
      interpretation:
        "Most of your response was delivered in English and was understandable.",
      evidence: `English score: ${englishScore}`,
      suggestion:
        "Focus on expanding vocabulary to make answers more precise and expressive.",
    });
  }

  // ---------------------------------------------------
  // 3. Answer Length / Effort Transparency
  // ---------------------------------------------------
  if (wordCount < 40) {
    insights.push({
      id: "answer-too-short",
      title: "Very Short Response",
      interpretation:
        "Your answer was quite short, which limits how much feedback can be generated.",
      evidence: `Word count: ${wordCount}`,
      suggestion:
        "Aim for at least 40–60 words to receive more detailed feedback.",
    });
  }

  // ---------------------------------------------------
  // 4. Transparency Card (Anti-cheat, Trust Builder)
  // ---------------------------------------------------
  insights.push({
    id: "scoring-transparency",
    title: "How Your Score Was Calculated",
    interpretation:
      "Your final score is based on both how smoothly you spoke and how consistently you used English.",
    evidence: `Fluency: ${fluencyScore}, English: ${englishScore}, Final: ${finalScore}`,
    suggestion:
      "Improving either fluency or English usage will raise your overall score.",
  });

  // ---------------------------------------------------
  // 5. Language Disclosure (Soft, Non-Punitive)
  // ---------------------------------------------------
  if (language !== "en" && language !== "unknown") {
    insights.push({
      id: "language-detected",
      title: "Detected Speaking Language",
      interpretation:
        "We detected that your response included a language other than English.",
      evidence: `Detected language: ${language}`,
      suggestion:
        "For English-focused practice, try responding fully in English.",
    });
  }

  return insights;
}
