def clamp(value, min_v=0.0, max_v=100.0):
    return max(min_v, min(max_v, value))


# ---------------------------
# LEVEL MAPPING (Single Source of Truth)
# ---------------------------

def level_from_score(score):
    if score < 40:
        return "low"
    elif score < 70:
        return "developing"
    elif score < 85:
        return "strong"
    else:
        return "very strong"


# ---------------------------
# CONFIDENCE SCORE
# ---------------------------

def confidence_score(raw):
    """
    Confidence is driven by:
    - Average energy (strength)
    - Energy variance (stability)
    """

    # Map energy ~0.00–0.05 → 0–60
    energy_strength = (raw["average_energy"] / 0.05) * 60

    # Stability penalty (less aggressive than before)
    stability = max(0.0, 40 - (raw["energy_variance"] * 1000))

    score = energy_strength + stability
    return round(clamp(score), 1)


# ---------------------------
# FLUENCY SCORE
# ---------------------------

def fluency_score(raw):
    """
    Improved fluency logic:
    - Strong emphasis on speaking continuity
    - Moderate penalty for pause frequency
    - Additional penalty for very long pauses
    """

    speaking_component = raw["speaking_ratio"] * 100

    # moderate pause frequency penalty
    pause_penalty = raw["pause_count"] * 4

    # stronger penalty for long freezes
    long_pause_penalty = min(raw["longest_pause"] * 8, 20)

    score = speaking_component - pause_penalty - long_pause_penalty

    return round(clamp(score), 1)


# ---------------------------
# PAUSE CONTROL SCORE
# ---------------------------

def pause_control_score(raw):
    """
    Pause control penalizes long hesitation.
    """

    if raw["longest_pause"] <= 0:
        return 100.0

    penalty = raw["longest_pause"] * 20  # reduced from 25

    score = 100 - penalty

    return round(clamp(score), 1)


# ---------------------------
# FINAL SCORE (Optional)
# ---------------------------

def final_score(confidence, fluency):
    """
    Balanced weighted average.
    """

    score = (confidence * 0.4) + (fluency * 0.6)
    return round(clamp(score), 1)


# ---------------------------
# HELPER TO GENERATE LEVELS
# ---------------------------

def generate_levels(confidence, fluency, final):
    return {
        "confidence_level": level_from_score(confidence),
        "fluency_level": level_from_score(fluency),
        "final_level": level_from_score(final)
    }
