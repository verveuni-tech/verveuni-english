# backend/ingestion/audio_loader.py

import os
import uuid
import shutil
import requests
import subprocess
import librosa

# ---------------------------------------------
# Resolve ffmpeg dynamically (portable)
# ---------------------------------------------
FFMPEG_BIN = shutil.which("ffmpeg")
if not FFMPEG_BIN:
    raise RuntimeError("ffmpeg not found in PATH")

# ---------------------------------------------
# Temp directory
# ---------------------------------------------
TEMP_DIR = "tmp_audio"
os.makedirs(TEMP_DIR, exist_ok=True)


def load_audio_from_url(audio_url: str):
    """
    Downloads audio, converts to mono 16kHz WAV,
    returns:
      y: np.ndarray
      sr: int
      wav_path: str (for Whisper / reuse)
    """

    uid = uuid.uuid4().hex
    input_path = os.path.join(TEMP_DIR, f"{uid}.input")
    wav_path = os.path.join(TEMP_DIR, f"{uid}.wav")

    try:
        # 1. Download audio
        r = requests.get(audio_url, stream=True, timeout=30)
        r.raise_for_status()
        with open(input_path, "wb") as f:
            for chunk in r.iter_content(8192):
                f.write(chunk)

        # 2. Convert ANY format → WAV (mono, 16kHz)
        subprocess.run(
            [
                FFMPEG_BIN,
                "-y",
                "-i", input_path,
                "-ac", "1",
                "-ar", "16000",
                wav_path
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )

        # 3. Load WAV for librosa
        y, sr = librosa.load(wav_path, sr=None)

        return y, sr, wav_path

    except Exception:
        # Cleanup partial files on failure
        if os.path.exists(wav_path):
            os.remove(wav_path)
        raise

    finally:
        if os.path.exists(input_path):
            os.remove(input_path)
