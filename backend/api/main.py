# backend/api/main.py
from fastapi.middleware.cors import CORSMiddleware

import sys
import os
import traceback
import logging

# ------------------------------------------------------------------
# Make backend/ importable
# ------------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

import config  # initializes Firebase Admin

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from pipeline.process_firestore_session import process_firestore_session

# ------------------------------------------------------------------
# Logging
# ------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s"
)
logger = logging.getLogger("verveuni-api")

# ------------------------------------------------------------------
# App
# ------------------------------------------------------------------
app = FastAPI(
    title="VerveUni Audio Analysis API",
    version="0.1.0"
)

# ------------------------------------------------------------------
# CORS (DEV)
# ------------------------------------------------------------------
# ------------------------------------------------------------------
# CORS (DEV + PROD)
# ------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://verveuni.com",
        "https://www.verveuni.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ------------------------------------------------------------------
# Schemas
# ------------------------------------------------------------------
class AnalyzeSessionRequest(BaseModel):
    sessionId: str = Field(..., min_length=3)

# ------------------------------------------------------------------
# Health check
# ------------------------------------------------------------------
@app.get("/")
def health():
    return {"status": "ok"}

# ------------------------------------------------------------------
# Routes
# ------------------------------------------------------------------
@app.post("/analyze-session")
def analyze_session_endpoint(payload: AnalyzeSessionRequest):
    logger.info("/analyze-session called")
    logger.info(f"sessionId={payload.sessionId}")

    try:
        result = process_firestore_session(payload.sessionId)

        logger.info(f"Analysis completed for session {payload.sessionId}")

        return {
            "status": "success",
            "sessionId": payload.sessionId,
            "analysisVersion": result.get("analysis_version") if result else None,
        }

    except ValueError as e:
        # Domain error (e.g. session not found)
        logger.warning(f"Domain error: {e}")
        raise HTTPException(status_code=404, detail=str(e))

    except Exception as e:
        # System / pipeline error (audio, ffmpeg, librosa, etc.)
        logger.error("BACKEND ERROR during analysis")
        traceback.print_exc()  # 🔥 full stack trace
        raise HTTPException(
            status_code=500,
            detail="Internal server error during analysis"
        )
