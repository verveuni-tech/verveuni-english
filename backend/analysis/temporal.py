import numpy as np
import librosa

def temporal_metrics(y, sr, silence_threshold=0.015, min_pause_sec=0.7):
    """
    Improved temporal segmentation:
    - Slightly higher silence threshold
    - Slightly longer minimum pause detection
    """

    rms = librosa.feature.rms(y=y)[0]
    frame_duration = 512 / sr

    speaking_mask = rms >= silence_threshold
    silence_mask = rms < silence_threshold

    speaking_time = speaking_mask.sum() * frame_duration
    silence_time = silence_mask.sum() * frame_duration

    pauses = []
    current = 0.0

    for is_silence in silence_mask:
        if is_silence:
            current += frame_duration
        else:
            if current >= min_pause_sec:
                pauses.append(current)
            current = 0.0

    if current >= min_pause_sec:
        pauses.append(current)

    meaningful_silence = sum(pauses)

    return {
        "speaking_time": round(speaking_time, 2),
        "silence_time": round(meaningful_silence, 2),  # only meaningful pauses
        "pause_count": len(pauses),
        "longest_pause": round(max(pauses) if pauses else 0.0, 2),
        "average_pause": round(np.mean(pauses), 2) if pauses else 0.0,
    }
