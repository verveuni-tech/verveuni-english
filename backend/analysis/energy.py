import numpy as np
import librosa

def energy_metrics(y, sr, silence_threshold=0.01):
    rms = librosa.feature.rms(y=y)[0]
    speaking_frames = rms >= silence_threshold

    if not speaking_frames.any():
        return {
            "average_energy": 0.0,
            "energy_variance": 0.0,
        }

    speaking_rms = rms[speaking_frames]

    return {
        "average_energy": round(float(np.mean(speaking_rms)), 4),
        "energy_variance": round(float(np.std(speaking_rms)), 4),
    }
