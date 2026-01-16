from pipeline.analyze_session import analyze_session

AUDIO_URL = "YOUR_CLOUDINARY_URL"

if __name__ == "__main__":
    result = analyze_session(AUDIO_URL)

    print("\n--- ANALYSIS RESULT ---")
    for k, v in result.items():
        print(f"{k}: {v}")
