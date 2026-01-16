def clamp(value, min_v=0.0, max_v=100.0):
    return max(min_v, min(max_v, value))


def confidence_score(raw):
    """
    Confidence is driven by:
    - Average energy (strength)
    - Energy variance (stability)
    """

    # Energy strength: map ~0.00–0.05 → 0–60
    energy_strength = (raw["average_energy"] / 0.05) * 60

    # Stability penalty: higher variance = lower score
    # Typical variance ~0.005–0.02
    stability = max(0.0, 40 - (raw["energy_variance"] * 2000))

    score = energy_strength + stability
    return round(clamp(score), 1)


def fluency_score(raw):
    """
    Fluency is driven by:
    - Speaking ratio (continuity)
    - Pause frequency (penalty)
    """

    speaking_component = raw["speaking_ratio"] * 70
    pause_penalty = raw["pause_count"] * 5

    score = speaking_component - pause_penalty
    return round(clamp(score), 1)


def pause_control_score(raw):
    """
    Pause control penalizes long hesitation.
    """

    if raw["longest_pause"] <= 0:
        return 100.0

    penalty = raw["longest_pause"] * 25
    score = 100 - penalty

    return round(clamp(score), 1)
