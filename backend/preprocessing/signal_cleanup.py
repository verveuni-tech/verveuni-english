import numpy as np
import librosa

def normalize_amplitude(y):
    peak = np.max(np.abs(y))
    return y / peak if peak > 0 else y

def trim_leading_trailing_silence(y, sr, threshold=0.01):
    rms = librosa.feature.rms(y=y)[0]
    frames = np.where(rms > threshold)[0]

    if len(frames) == 0:
        return y

    start = librosa.frames_to_samples(frames[0])
    end = librosa.frames_to_samples(frames[-1])

    return y[start:end]
