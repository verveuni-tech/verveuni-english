import librosa
import numpy as np

def prosody_metrics(y, sr, silence_threshold=0.01):
    zcr = librosa.feature.zero_crossing_rate(y)[0]
    rms = librosa.feature.rms(y=y)[0]

    speaking = rms >= silence_threshold
    rate = np.mean(zcr[speaking]) if speaking.any() else 0.0

    return {
        "tempo_proxy": round(float(rate), 4)
    }
