def interpret_metrics(raw):
    confidence = "low"
    if raw["average_energy"] > 0.03 and raw["energy_variance"] < 0.015:
        confidence = "high"
    elif raw["average_energy"] > 0.02:
        confidence = "medium"

    fluency = "low"
    if raw["speaking_ratio"] > 0.65 and raw["pause_count"] <= 4:
        fluency = "high"
    elif raw["speaking_ratio"] > 0.5:
        fluency = "medium"

    return {
        "confidence_level": confidence,
        "fluency_level": fluency
    }
