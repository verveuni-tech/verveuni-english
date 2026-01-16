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
    pause_control_score
)
from contracts.output_schema import build_output_contract


def analyze_session(audio_url: str):
    # 1. Load audio
    y, sr = load_audio_from_url(audio_url)

    # 2. Preprocess
    y = normalize_amplitude(y)
    y = trim_leading_trailing_silence(y, sr)

    # 3. Raw analysis
    temporal = temporal_metrics(y, sr)
    energy = energy_metrics(y, sr)
    prosody = prosody_metrics(y, sr)

    # 4. Derived metrics
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

    # 5. Rule-based signals
    signals = interpret_metrics(raw_metrics)

    # 6. Normalized scores
    scores = {
        "confidence_score": confidence_score(raw_metrics),
        "fluency_score": fluency_score(raw_metrics),
        "pause_control_score": pause_control_score(raw_metrics),
    }

    # 7. FINAL output contract (built ONCE)
    return build_output_contract(
        raw_metrics=raw_metrics,
        signals=signals,
        scores=scores,
        sr=sr,
    )
