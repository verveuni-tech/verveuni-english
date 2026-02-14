import os

from ingestion.audio_loader import load_audio_from_url
from preprocessing.signal_cleanup import (
    normalize_amplitude,
    trim_leading_trailing_silence
)
from analysis.temporal import temporal_metrics
from analysis.energy import energy_metrics
from analysis.prosody import prosody_metrics

from scoring.rules import interpret_metrics
from scoring.scores import (
    confidence_score,
    fluency_score,
    pause_control_score,
    level_from_score,   # <-- NEW IMPORT
)

from transcription.transcribe_audio import transcribe_audio
from analysis.language import english_validity_metrics

from contracts.output_schema import build_output_contract


def analyze_session(audio_url: str):
    wav_path = None

    try:
        # ---------------------------------------------------------
        # 1. Load audio (download + convert once)
        # ---------------------------------------------------------
        y, sr, wav_path = load_audio_from_url(audio_url)

        # ---------------------------------------------------------
        # 2. Preprocess (AUDIO ONLY)
        # ---------------------------------------------------------
        y = normalize_amplitude(y)
        y = trim_leading_trailing_silence(y, sr)

        # ---------------------------------------------------------
        # 3. Raw acoustic analysis (LANGUAGE-AGNOSTIC)
        # ---------------------------------------------------------
        temporal = temporal_metrics(y, sr)
        energy = energy_metrics(y, sr)
        prosody = prosody_metrics(y, sr)

        # ---------------------------------------------------------
        # 4. Derived acoustic metrics
        # ---------------------------------------------------------
        total_duration = len(y) / sr if sr > 0 else 0.0
        speaking_ratio = (
            round(temporal["speaking_time"] / total_duration, 2)
            if total_duration > 0 else 0.0
        )

        raw_metrics = {
            "total_duration": round(total_duration, 2),
            "speaking_ratio": speaking_ratio,
            **temporal,
            **energy,
            **prosody,
        }

        # ---------------------------------------------------------
        # 5. Lightweight signals (NOT levels anymore)
        # ---------------------------------------------------------
        signals = interpret_metrics(raw_metrics)

        # ---------------------------------------------------------
        # 6. Audio-based scores
        # ---------------------------------------------------------
        confidence = confidence_score(raw_metrics)
        fluency = fluency_score(raw_metrics)
        pause_control = pause_control_score(raw_metrics)

        fluency_score_final = round(
            (confidence + fluency + pause_control) / 3,
            2
        )

        # ---------------------------------------------------------
        # 7. LANGUAGE LAYER (TRANSCRIPTION + VALIDITY)
        # ---------------------------------------------------------
        transcription = transcribe_audio(wav_path)

        english_metrics = english_validity_metrics(
            transcript=transcription["transcript"],
            detected_language=transcription["language"],
        )

        english_score = round(
            english_metrics["english_ratio"] * 100,
            2
        )

        # ---------------------------------------------------------
        # 8. FINAL SCORE (ANTI-CHEAT RULES)
        # ---------------------------------------------------------
        final_score = round(
            fluency_score_final * 0.6 + english_score * 0.4,
            2
        )

        # Hard caps
        if english_metrics["english_ratio"] < 0.5:
            final_score = min(final_score, 30)

        if transcription["word_count"] < 40:
            final_score = min(final_score, 40)

        # ---------------------------------------------------------
        # 9. Level mapping (SINGLE SOURCE OF TRUTH)
        # ---------------------------------------------------------
        levels = {
            "confidence_level": level_from_score(confidence),
            "fluency_level": level_from_score(fluency_score_final),
            "english_level": level_from_score(english_score),
            "final_level": level_from_score(final_score),
        }

        # ---------------------------------------------------------
        # 10. Final output contract
        # ---------------------------------------------------------
        return build_output_contract(
            raw_metrics=raw_metrics,
            signals=signals,
            scores={
                "confidence": confidence,
                "fluency": fluency_score_final,
                "english": english_score,
                "final": final_score,
            },
            levels=levels,  # <-- NEW
            sr=sr,
            extra={
                "transcript": transcription["transcript"],
                "language": transcription["language"],
                "english_ratio": english_metrics["english_ratio"],
                "word_count": transcription["word_count"],
            },
        )

    finally:
        # ---------------------------------------------------------
        # Guaranteed cleanup
        # ---------------------------------------------------------
        if wav_path and os.path.exists(wav_path):
            os.remove(wav_path)
