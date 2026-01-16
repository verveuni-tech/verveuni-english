from datetime import datetime

def build_output_contract(raw_metrics, signals, scores, sr):
    return {
        "analysis_version": "v1.0",

        "session_metadata": {
            "audio_duration": raw_metrics.get("total_duration"),
            "sample_rate": sr,
            "analysis_timestamp": datetime.utcnow().isoformat()
        },

        "raw_metrics": raw_metrics,
        "signals": signals,
        "scores": scores,

        "system_notes": {
            "analysis_type": "rules_based",
            "language_dependency": "none",
            "content_analysis": False
        }
    }
