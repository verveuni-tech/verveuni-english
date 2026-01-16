# backend/ingestion/audio_loader.py

import os
import uuid
import requests
import subprocess
import librosa
FFMPEG_PATH = r"C:\ffmpeg\ffmpeg-8.0.1-essentials_build\bin\ffmpeg.exe"


TEMP_DIR = "tmp_audio"
os.makedirs(TEMP_DIR, exist_ok=True)

def load_audio_from_url(audio_url: str):
    uid = uuid.uuid4().hex
    input_path = os.path.join(TEMP_DIR, f"{uid}.input")
    wav_path = os.path.join(TEMP_DIR, f"{uid}.wav")

    # 1. Download audio
    r = requests.get(audio_url, stream=True)
    r.raise_for_status()
    with open(input_path, "wb") as f:
        for chunk in r.iter_content(8192):
            f.write(chunk)

    # 2. Convert ANY format → WAV (FFmpeg)
    subprocess.run(
    [
        FFMPEG_PATH,
        "-y",
        "-i", input_path,
        "-ac", "1",
        "-ar", "16000",
        wav_path
    ],
    check=True,
)

    # 3. Load WAV with librosa
    y, sr = librosa.load(wav_path, sr=None)

    # 4. Cleanup
    os.remove(input_path)
    os.remove(wav_path)

    return y, sr
