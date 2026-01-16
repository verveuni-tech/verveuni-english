from datetime import datetime
from firebase_admin import firestore

from pipeline.analyze_session import analyze_session


def _is_analysis_complete(analysis_result: dict) -> bool:
    """
    Defines invariant requirements for a completed session.
    """
    if not analysis_result:
        return False

    required_fields = [
        "analysis_version",
        "raw_metrics",
        "signals",
        "scores",
    ]

    return all(field in analysis_result for field in required_fields)


def process_firestore_session(session_id: str):
    """
    Orchestrates the Firestore session lifecycle.

    Lifecycle:
      created → processing → completed
      created → processing → failed
    """

    db = firestore.client()
    session_ref = db.collection("sessions").document(session_id)

    snapshot = session_ref.get()
    if not snapshot.exists:
        raise ValueError(f"Session {session_id} does not exist")

    session_data = snapshot.to_dict()
    current_status = session_data.get("status")

    # ------------------------------------------------------------------
    # Guard: never reprocess terminal sessions
    # ------------------------------------------------------------------
    if current_status in ("completed", "failed"):
        return session_data.get("analysis")

    audio_url = session_data.get("audioUrl")
    if not audio_url:
        session_ref.update({
            "status": "failed",
            "failureReason": "audioUrl missing",
            "updatedAt": datetime.utcnow(),
        })
        raise ValueError("audioUrl missing in session document")

    # ------------------------------------------------------------------
    # 1. Mark as processing
    # ------------------------------------------------------------------
    session_ref.update({
        "status": "processing",
        "updatedAt": datetime.utcnow(),
    })

    try:
        # ------------------------------------------------------------------
        # 2. Run analysis pipeline (FINAL contract returned)
        # ------------------------------------------------------------------
        analysis_result = analyze_session(audio_url)

        # ------------------------------------------------------------------
        # 3. Validate completion criteria
        # ------------------------------------------------------------------
        if not _is_analysis_complete(analysis_result):
            raise RuntimeError("Analysis did not meet completion requirements")

        # ------------------------------------------------------------------
        # 4. Persist completed state
        # ------------------------------------------------------------------
        session_ref.update({
            "analysis": analysis_result,
            "analysisVersion": analysis_result.get("analysis_version"),
            "status": "completed",
            "completedAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow(),
        })

        return analysis_result

    except Exception as e:
        # ------------------------------------------------------------------
        # Failure is terminal
        # ------------------------------------------------------------------
        session_ref.update({
            "status": "failed",
            "failureReason": str(e),
            "updatedAt": datetime.utcnow(),
        })
        raise
