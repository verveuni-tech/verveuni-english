def english_validity_metrics(
    transcript: str,
    detected_language: str,
    language_confidence: float | None = None,
):
    transcript = transcript or ""
    words = transcript.split()
    word_count = len(words)

    if detected_language == "en":
        english_ratio = 1.0
    else:
        english_ratio = 0.0

    # -------------------------------
    # v1.1: coherence signal (soft)
    # -------------------------------
    unique_words = set(w.lower() for w in words)
    unique_ratio = len(unique_words) / word_count if word_count else 0.0

    excessive_repetition = (
        word_count > 20 and unique_ratio < 0.25
    )

    coherence_flag = not excessive_repetition

    return {
        "english_ratio": english_ratio,
        "word_count": word_count,
        "detected_language": detected_language,
        "language_confidence": language_confidence,
        "unique_word_ratio": round(unique_ratio, 2),
        "coherence_flag": coherence_flag,
    }
