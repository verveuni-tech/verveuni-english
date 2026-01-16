import numpy as np
import librosa

def temporal_metrics(y, sr, silence_threshold=0.01, min_pause_sec=0.5):
    rms = librosa.feature.rms(y=y)[0]
    frame_duration = 512 / sr

    speaking = rms >= silence_threshold
    silence = rms < silence_threshold

    speaking_time = speaking.sum() * frame_duration
    silence_time = silence.sum() * frame_duration

    pauses = []
    current = 0.0
    for s in silence:
        if s:
            current += frame_duration
        else:
            if current >= min_pause_sec:
                pauses.append(current)
            current = 0.0

    if current >= min_pause_sec:
        pauses.append(current)

    return {
        "speaking_time": round(speaking_time, 2),
        "silence_time": round(silence_time, 2),
        "pause_count": len(pauses),
        "longest_pause": round(max(pauses) if pauses else 0.0, 2),
        "average_pause": round(np.mean(pauses), 2) if pauses else 0.0,
    }
