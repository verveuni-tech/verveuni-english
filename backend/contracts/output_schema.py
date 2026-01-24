from datetime import datetime


def build_output_contract(
    raw_metrics,
    signals,
    scores,
    sr,
    extra: dict | None = None
):
    """
    Canonical analysis output contract.

    This function defines the single source of truth for
    what the backend promises to downstream consumers
    (Firestore, frontend, analytics, etc.).
    """

    return {
        "analysis_version": "v2.0",

        # -------------------------------------------------
        # Session-level metadata (system-owned)
        # -------------------------------------------------
        "session_metadata": {
            "audio_duration": raw_metrics.get("total_duration"),
            "sample_rate": sr,
            "analysis_timestamp": datetime.utcnow().isoformat(),
        },

        # -------------------------------------------------
        # Core analysis outputs
        # -------------------------------------------------
        "raw_metrics": raw_metrics,
        "signals": signals,
        "scores": scores,

        # -------------------------------------------------
        # Optional extended metadata (language, transcript, etc.)
        # -------------------------------------------------
        "extra": extra or {},

        # -------------------------------------------------
        # System notes (for debugging / evolution)
        # -------------------------------------------------
        "system_notes": {
            "analysis_type": "rules_based",
            "language_dependency": "mixed",   # was "none"
            "content_analysis": True,         # now enabled
        },
    }
