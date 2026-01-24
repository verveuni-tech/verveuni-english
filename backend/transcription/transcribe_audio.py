from faster_whisper import WhisperModel


# Load once (important for performance)
model = WhisperModel(
    "base",
    device="cpu",
    compute_type="int8"
)


def transcribe_audio(audio_path: str) -> dict:
    """
    Returns:
      {
        transcript: str,
        language: str,
        language_confidence: float,
        word_count: int
      }
    """

    segments, info = model.transcribe(audio_path)

    text_parts = []
    for segment in segments:
        text_parts.append(segment.text)

    transcript = " ".join(text_parts).strip()

    return {
        "transcript": transcript,
        "language": info.language,
        "language_confidence": info.language_probability,
        "word_count": len(transcript.split()),
    }
