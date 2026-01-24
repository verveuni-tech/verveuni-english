VerveUni – Session Analysis Architecture Document
1. Purpose of This Document

This document explains the complete architecture of the VerveUni MVP:

What each folder and file is responsible for

How data flows from user → backend → Firestore → frontend → feedback UI

Where decisions, interpretations, and states live

What is considered source of truth

This is not a tutorial.
This is an engineering reference.

2. High-Level System Overview
Core Idea

Users complete a speaking session → audio is analyzed → structured metrics are produced → human-readable feedback is shown.

Key Principles

Backend is pure analysis

Firestore is state + persistence

Frontend is interpretation + presentation

No UI logic leaks into backend

No analysis logic leaks into frontend

3. High-Level Data Flow
User
 └─▶ Frontend (Session UI)
      └─▶ Audio Recording
           └─▶ Cloudinary (audio storage)
                └─▶ Firestore (session metadata)
                     └─▶ Backend (/analyze-session)
                          └─▶ Audio analysis pipeline
                               └─▶ Metrics + Scores
                                    └─▶ Firestore (analysis result)
                                         └─▶ Frontend (Results Page)
                                              └─▶ Interpretation Layer
                                                   └─▶ Feedback UI

4. Backend Architecture
Backend Responsibility

The backend does not care about UI, users, or wording.
It only answers:

“Given an audio file, what objectively happened?”

Backend Folder Structure
backend/
├── api/
│   └── main.py
│
├── ingestion/
│   └── audio_loader.py
│
├── preprocessing/
│   ├── normalize.py
│   └── silence_trim.py
│
├── analysis/
│   ├── temporal.py
│   ├── energy.py
│   └── prosody.py
│
├── scoring/
│   ├── scores.py
│   └── rules.py
│
├── pipeline/
│   ├── analyze_session.py
│   └── process_firestore_session.py
│
├── contracts/
│   └── output_schema.py

4.1 api/main.py

Role: HTTP boundary

Exposes /analyze-session

Receives sessionId

Calls process_firestore_session

Returns success/failure

Does NOT:

Analyze audio

Touch interpretation

Compute metrics

4.2 ingestion/audio_loader.py

Role: Audio loading

Downloads audio from Cloudinary

Converts to WAV if needed

Returns (y, sr)

This is the only place audio IO happens.

4.3 preprocessing/*

Role: Signal cleanup

Examples:

Normalize amplitude

Trim silence

Remove artifacts

No business logic.
Only signal hygiene.

4.4 analysis/*

Role: Raw measurement

Each file answers one physical question:

temporal.py → pauses, speaking time

energy.py → loudness, variance

prosody.py → pitch, intonation

Output = numbers only, no meaning.

4.5 scoring/*

Role: Convert raw metrics into normalized scores

Examples:

Confidence score (0–1)

Fluency score

Pause control score

Rules here are math-based, not UX-based.

4.6 contracts/output_schema.py

Role: Canonical output shape

Defines what the backend promises to the rest of the system.

Example:

{
  "analysis_version": "v1",
  "raw_metrics": {...},
  "scores": {...},
  "signals": {...}
}


If this changes → frontend must adapt.

4.7 pipeline/analyze_session.py

Role: Pure computation

This file:

Loads audio

Preprocesses

Computes metrics

Computes scores

Builds output contract

Does NOT:

Write to Firestore

Know session state

Handle retries

4.8 pipeline/process_firestore_session.py

Role: Lifecycle orchestration

This is the brain of backend execution.

State machine:

created → processing → completed
created → processing → failed


Responsibilities:

Read session from Firestore

Guard against reprocessing

Call analyze_session

Validate completion

Persist final result

This is the only place backend touches Firestore.

5. Firestore Data Model
Sessions Collection
sessions/{sessionId}
{
  "status": "created | processing | completed | failed",
  "audioUrl": "...",
  "duration": 30,
  "analysis": { ... },
  "analysisVersion": "v1",
  "completedAt": "...",
  "failureReason": null
}


Firestore is the single source of truth for session state.

6. Frontend Architecture
Frontend Responsibility

Frontend answers:

“How do we explain what happened to a human?”

Frontend Folder Structure
frontend/src/
├── pages/
│   ├── Landing.jsx
│   ├── Session.jsx
│   ├── PostSessionForm.jsx
│   └── Results.jsx
│
├── components/
│   └── FeedbackUI.jsx
│
├── utils/
│   └── interpretSession.js
│
├── services/
│   └── firestore.js

6.1 Session.jsx

Interview / simulation UI

Records audio

Produces finalAudioBlob

No backend logic here.

6.2 PostSessionForm.jsx

Role: Session creation

Uploads audio

Creates Firestore document

Triggers backend analysis

Navigates to results page

This is the handoff point from session → analysis.

6.3 Results.jsx

Role: Data coordinator

Fetches session doc from Firestore

Waits for status === completed

Passes analysis to interpretation layer

Renders FeedbackUI

This is the controller of the feedback flow.

6.4 utils/interpretSession.js

Role: Meaning layer

This is where:

Raw metrics become language

Scores become feedback

Evidence is extracted

Example:

if (metrics.pause_total_time > 30) {
  insights.push({
    id: "pauses",
    title: "Frequent Pauses",
    interpretation: "...",
    evidence: "...",
    suggestion: "..."
  })
}


This layer is:

Deterministic

Replaceable

Fast

No backend calls here.

6.5 FeedbackUI.jsx

Role: Pure presentation

Receives insights[]

Renders cards

No logic, no fetching

If insights is empty → shows neutral message.

7. Key Design Decisions (Important)
Why interpretation is frontend-side

Faster iteration

No backend redeploys

A/B testable

Language-specific

Persona-aware later

Why backend returns raw metrics

Objective

Auditable

Reusable

Future-proof

Why Firestore is central

Async-safe

Retry-safe

Decouples UI from backend timing

8. What Counts as “Session Completed”

A session is completed when:

Analysis contract exists

Required fields present

No runtime errors

Completion logic lives only in:

process_firestore_session.py

9. Mental Model Summary
Layer	Think of it as
Backend	Sensor
Firestore	Ledger
Interpretation	Teacher
UI	Report card
10. How to Extend Safely

New metric → backend analysis/*

New score → backend scoring/*

New feedback → frontend interpretSession.js

New UI layout → FeedbackUI.jsx

No cross-contamination.